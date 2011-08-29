Ext.define('MV.store.Detail', {
  extend: 'Ext.data.TreeStore',
  root: {
    text: "adendesk_frontoffice:developer:Company:5346428:Contract",
    expanded: true,
    children: [
      {
        text: 'contracts',
        children: [
          {
            text: 'customer_relationship',
            children: [
              {
                text: 'email',
                children: [
                  {
                    text: 'dverloop@figarocms.fr',
                    leaf: true
                  }
                ]
              },
              {
                text: 'name',
                children: [
                  {
                    text: 'VERLOOP Delphine',
                    leaf: true
                  }
                ]
              },
              {
                text: 'telephone',
                children: [
                  {
                    text: '03 59 31 64 07',
                    leaf: true
                  }
                ]
              }
            ]
          },
          {
            text: 'services',
            children: [
              {
                text: 'product',
                children: [
                  {
                    text: 'family',
                    children: [
                      {
                        text: 'brand',
                        children: [
                          {
                            text: 'name',
                            children: [
                              {
                                text: 'keljob',
                                leaf: true
                              }
                            ]
                          }, {
                            text: 'code',
                            children: [
                              {
                                text: "5000106",
                                leaf: true
                              }
                            ]
                          }
                        ]
                      },
                      {
                        text: 'code',
                        children: [
                          {
                            text: 5000008,
                            leaf: true
                          }
                        ]
                      }
                    ]
                  }, {
                    text: "name",
                    children: [
                      {
                        text: 'Offre',
                        leaf: true
                      }
                    ]
                  }, {
                    text: "code",
                    children: [
                      {
                        text: '5003238',
                        leaf: true
                      }
                    ]
                  }, {
                    text: "reference",
                    children: [
                      {
                        text: '01OFFEN0107',
                        leaf: true
                      }
                    ]
                  }
                ]
              }, {
                text: 'end_at',
                children: [
                  {
                    text: '2012-05-31T21:59:00.000Z',
                    leaf: true
                  }
                ]
              }, {
                text: 'auto_renewall',
                children: [
                  {
                    text: 'false',
                    leaf: true
                  }
                ]
              }, {
                text: 'start_at',
                children: [
                  {
                    text: '2011-05-31T22:00:00.000Z',
                    leaf: true
                  }
                ]
              }, {
                text: 'quantity',
                children: [
                  {
                    text: '1',
                    leaf: true
                  }
                ]
              }, {
                text: 'code',
                children: [
                  {
                    text: '5213728',
                    leaf: true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});