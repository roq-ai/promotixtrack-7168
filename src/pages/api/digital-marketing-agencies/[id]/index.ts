import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { digitalMarketingAgencyValidationSchema } from 'validationSchema/digital-marketing-agencies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.digital_marketing_agency
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDigitalMarketingAgencyById();
    case 'PUT':
      return updateDigitalMarketingAgencyById();
    case 'DELETE':
      return deleteDigitalMarketingAgencyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDigitalMarketingAgencyById() {
    const data = await prisma.digital_marketing_agency.findFirst(
      convertQueryToPrismaUtil(req.query, 'digital_marketing_agency'),
    );
    return res.status(200).json(data);
  }

  async function updateDigitalMarketingAgencyById() {
    await digitalMarketingAgencyValidationSchema.validate(req.body);
    const data = await prisma.digital_marketing_agency.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteDigitalMarketingAgencyById() {
    const data = await prisma.digital_marketing_agency.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
