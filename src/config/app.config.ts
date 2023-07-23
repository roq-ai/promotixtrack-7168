interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: [
    'Owner',
    'HR Manager',
    'Team Manager',
    'Employee',
    'IT Administrator',
    'Director',
    'Managing Director',
    'Chief Executive Officer',
  ],
  tenantName: 'Digital Marketing Agency',
  applicationName: 'PromotixTrack - Employee Monitoring System',
  addOns: ['chat', 'file', 'notifications'],
};
