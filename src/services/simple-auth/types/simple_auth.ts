/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/simple_auth.json`.
 */
export type SimpleAuth = {
  address: "3wXUKJWB3eKzxC7d3YMdoVcHJfzadK4fTHt2pMwiXPAH";
  metadata: {
    name: "simpleAuth";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "authenticate";
      discriminator: [172, 100, 46, 57, 235, 170, 237, 96];
      accounts: [
        {
          name: "owner";
          docs: ["Only admin or owner can authenticate users"];
          signer: true;
          address: "8wnpYgATzbThvG8dj8LrzNw3fPFeem2MkExst83WsDtm";
        },
        {
          name: "authenticationState";
          docs: ["Authentication state account to be changed"];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  97,
                  117,
                  116,
                  104,
                  101,
                  110,
                  116,
                  105,
                  99,
                  97,
                  116,
                  105,
                  111,
                  110,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "arg";
                path: "user";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "user";
          type: "pubkey";
        }
      ];
    },
    {
      name: "deauthenticate";
      discriminator: [219, 184, 218, 8, 50, 190, 100, 103];
      accounts: [
        {
          name: "owner";
          docs: ["Only admin or owner can deauthenticate users"];
          signer: true;
          address: "8wnpYgATzbThvG8dj8LrzNw3fPFeem2MkExst83WsDtm";
        },
        {
          name: "authenticationState";
          docs: ["Authentication state account to be changed"];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  97,
                  117,
                  116,
                  104,
                  101,
                  110,
                  116,
                  105,
                  99,
                  97,
                  116,
                  105,
                  111,
                  110,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "arg";
                path: "user";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "user";
          type: "pubkey";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "owner";
          docs: [
            "Only admin or owner can initialize users' authentication state"
          ];
          writable: true;
          signer: true;
          address: "8wnpYgATzbThvG8dj8LrzNw3fPFeem2MkExst83WsDtm";
        },
        {
          name: "authenticationState";
          docs: ["Initialize authentication state account"];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  97,
                  117,
                  116,
                  104,
                  101,
                  110,
                  116,
                  105,
                  99,
                  97,
                  116,
                  105,
                  111,
                  110,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              },
              {
                kind: "arg";
                path: "user";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "user";
          type: "pubkey";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "authenticationState";
      discriminator: [34, 241, 212, 231, 227, 102, 144, 60];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "invalidOwner";
      msg: "Input account owner is not the program address";
    }
  ];
  types: [
    {
      name: "authenticationState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            docs: ["Bump to identify PDA"];
            type: "u8";
          },
          {
            name: "user";
            docs: ["User address"];
            type: "pubkey";
          },
          {
            name: "isAuthenticated";
            docs: ["Whether user is authenticated or not"];
            type: "bool";
          },
          {
            name: "nonce";
            type: "u64";
          }
        ];
      };
    }
  ];
};
