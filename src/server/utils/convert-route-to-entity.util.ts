const mapping: Record<string, string> = {
  'digital-marketing-agencies': 'digital_marketing_agency',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
