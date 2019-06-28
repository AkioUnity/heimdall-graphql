export const GLOBALS_CONSTANTS = {
  APP_TITLE: 'Heimdall',
  MENU_LIST: [
    { title: 'Dashboard', link: '/dashboard', icon: 'dashboard', children: [] },
    { title: 'Vehicles', link: '/vehicles', icon: 'commute', children: [] },
    { title: 'Services', link: '/services', icon: 'gavel', children: [] },
    {
      title: 'Pepper Potts', link: '', icon: 'face', children: [
        { title: 'Finance', link: '/pepper-pots/finance', icon: 'timeline', children: [] },
        { title: 'CRM', link: '/pepper-pots/crm', icon: 'pie_chart', children: [] },
        { title: 'Workflow', link: '/pepper-pots/workflow', icon: 'device_hub', children: [] }
      ]
    },
    {
      title: 'Thanos', link: '', icon: 'sentiment_dissatisfied', children: [
        { title: 'IAM  and Admin', link: '/thans/admin', icon: 'how_to_reg', children: [] },
        { title: 'Datastore', link: '/thans/datastore', icon: 'business', children: [] }
      ]
    },
    {
      title: 'Vision', link: '', icon: 'settings_input_svideo', children: [
        { title: 'Playground', link: '/vision/playground', icon: 'bubble_chart', children: [] }
      ]
    }
  ],
  PAGE_MODE: {
    CREATE: 'create', UPDATE: 'update'
  }
};
