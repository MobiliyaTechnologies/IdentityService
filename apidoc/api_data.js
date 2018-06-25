define({ "api": [
  {
    "type": "post",
    "url": "/forgot-password",
    "title": "Forgot Password",
    "version": "1.0.0",
    "name": "ForgotPassword",
    "group": "Auth",
    "description": "<p>User Login.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{ \"email\": \"superadmin@company.com\"}' http://<ip>:<port>/forgot-password\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\": \"superadmin@compnay.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (400 example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\": {\n          \"email\": {\n              \"location\": \"body\",\n              \"param\": \"email\",\n              \"msg\": \"Invalid\"\n          }\n      }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{ \n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/forgot-password"
      }
    ],
    "filename": "routes/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "User Login",
    "version": "1.0.0",
    "name": "LoginUser",
    "group": "Auth",
    "description": "<p>User Login.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{ \"email\": \"superadmin@company.com\", \"password\": \"welcome\"}' http://<ip>:<port>/login\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\": \"superadmin@company.com\",\n   \"password\": \"welcome\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (400 example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\": {\n          \"email\": {\n              \"location\": \"body\",\n              \"param\": \"email\",\n              \"msg\": \"Invalid\"\n          },\n          \"password\": {\n              \"location\": \"body\",\n              \"param\": \"password\",\n              \"msg\": \"Invalid\"\n          },\n            \"non authoritative information\": {\n             \"message\": \"Invalid Credential.\"\n      }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data to return access_token and expires of access token.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Success\",\n     \"data\":{\n              \"access_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJoM0NPNnc0VjM0amZOaDgtbE5wTUwzSloxZmx4b3h2TyIsImV4cCI6MTUxMjc1MTIwNzUxMywiaWF0IjoxNTEyNzQxMjA3fQ.lvNp8mtyTOyBcrDGhX_p8FzCy-f9-PbuzY148Mm81AM\",\n              \"expires\": 1512751207513\n      }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/login"
      }
    ],
    "filename": "routes/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "User Logout",
    "version": "1.0.0",
    "name": "LogoutUser",
    "group": "Auth",
    "description": "<p>User Logout.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{}' http://<ip>:<port>/logout\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was Invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/logout"
      }
    ],
    "filename": "routes/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/reset-password",
    "title": "Reset Password",
    "version": "1.0.0",
    "name": "ResetPassword",
    "group": "Auth",
    "description": "<p>User Reset Password.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X PUT  --data '{}' http://<ip>:<port>/reset-password",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User's oldPassword</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User's newPassword for Reset</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\": \"test@company.com\",\n   \"oldPassword\":\"Welcome@123\",\n   \"newPassword\":\"9zOdSzxj\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (400 example):",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"error\": {\n          \"newPassword\": {\n              \"location\": \"body\",\n              \"param\": \"newPassword\",\n              \"msg\": \"Invalid\"\n          },\n          \"email\": {\n              \"location\": \"body\",\n              \"param\": \"email\",\n              \"msg\": \"Invalid\"\n          },\n          \"oldPassword\": {\n              \"location\": \"body\",\n              \"param\": \"oldPassword\",\n              \"msg\": \"Invalid\"\n          }\n      }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{ \n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/reset-password/"
      }
    ],
    "filename": "routes/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/healthcheck",
    "title": "Health Check",
    "version": "1.0.0",
    "name": "GetHealthCheck",
    "group": "Health",
    "description": "<p>Application health Check.</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3301/healthcheck"
      }
    ],
    "filename": "routes/index.js",
    "groupTitle": "Health"
  },
  {
    "type": "post",
    "url": "/roles",
    "title": "Create Role",
    "version": "1.0.0",
    "name": "Create_Role",
    "group": "Role",
    "description": "<p>Create a Role</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{ \"roleName\": \"Super Admin\", \"privileges\": \"Manage users\"}' http://<ip>:<port>/roles\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>Mandatory role's Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "privileges",
            "description": "<p>Mandatory privileges.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\t\"roleName\": \"Super Admin\",\n\t\t\"privileges\": \"Manage users\"  \n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 201 CREATED\n\t\t{\n    \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"935ba91b-d26d-49c0-8dc0-98556ea2cb2a\",\n        \"roleName\": \"Super Admin\",\n        \"privileges\": \"Manage users\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/roles"
      }
    ],
    "filename": "routes/roles.js",
    "groupTitle": "Role"
  },
  {
    "type": "delete",
    "url": "/roles/:id",
    "title": "Delete Role",
    "version": "1.0.0",
    "name": "Delete_Role",
    "group": "Role",
    "description": "<p>Delete a Role</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE  --data '{}' http://<ip>:<port>/roles/2a49828d-514d-403c-8868-3d2de896e0dd\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/roles/2a49828d-514d-403c-8868-3d2de896e0dd"
      }
    ],
    "filename": "routes/roles.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "/roles/:id",
    "title": "Get Role's details",
    "version": "1.0.0",
    "name": "Get_Roles_Details",
    "group": "Role",
    "description": "<p>Show Role information.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  --data '{}'  http://localhost:3301/roles/bd39049f-5e2a-4904-9571-68accae08aff -H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "(json) Success-Response:",
          "content": "  HTTP/1.1 200 OK\n {\n    \"message\": \"Success\",\n    \"data\": \n        {\n            \"id\": \"bd39049f-5e2a-4904-9571-68accae08aff\",\n            \"roleName\": \"Super Admin\",\n            \"privileges\": \"Manage users\"\n        }\n    \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/roles/bd39049f-5e2a-4904-9571-68accae08aff"
      }
    ],
    "filename": "routes/roles.js",
    "groupTitle": "Role"
  },
  {
    "type": "get",
    "url": "/roles",
    "title": "Get All Roles List",
    "version": "1.0.0",
    "name": "Get_Roles_List",
    "group": "Role",
    "description": "<p>Get All Roles List.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3301/roles?limit=2&order=DESC&page=1 -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>page Roles Page Number (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>limit Roles List limit(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "sort",
            "defaultValue": "createdAt",
            "description": "<p>sort Roles Sorting on which field(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "order",
            "defaultValue": "asc",
            "description": "<p>order Roles Sorting field order(asc|desc)(optional).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "(json) Success-Response:",
          "content": "  HTTP/1.1 200 OK\n     {\n         \"message\": \"Success\",\n         \"count\": 2,\n    \t \"data\": [\n      {\n          \"id\": \"2d9fbfbf-194c-4316-85e9-97561dea5162\",\n          \"roleName\": \"Super Admin\",\n          \"privileges\": \"Manage users\"\n      },\n      {\n          \"id\": \"75bf7fb2-56a2-45e4-a1c7-7114fd20f311\",\n          \"roleName\": \"Tenant Admin\",\n          \"privileges\": \"Manage tenant specific fleets and users\"\n      },\n      {\n          \"id\": \"966b70d1-7879-4473-afa8-eb956ada7b82\",\n          \"roleName\": \"Fleet Admin\",\n          \"privileges\": \"Manage fleet specific vehicles and drivers\"\n      },\n      {\n          \"id\": \"9da7fee9-b08b-4504-895e-834013cd11ee\",\n          \"roleName\": \"Driver\",\n          \"privileges\": \"Create trip\"\n      }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/roles"
      }
    ],
    "filename": "routes/roles.js",
    "groupTitle": "Role"
  },
  {
    "type": "put",
    "url": "/roles/:id",
    "title": "Update Role's details",
    "version": "1.0.0",
    "name": "Update_Role",
    "group": "Role",
    "description": "<p>Update Role.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X PUT  --data '{\"roleName\":\"Tenant Admin\",\"privileges\": \"Manage users\"}' http://<ip>:<port>/roles/bd39049f-5e2a-4904-9571-68accae08aff\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleName",
            "description": "<p>roleName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "privileges",
            "description": "<p>privileges.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\t{\n\t\t\"roleName\": \"Tenant Admin\",\n \t\t\"privileges\": \"Manage users\"\n\n\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n      \"message\": \"Success\",\n      \"data\": \n          {\n              \"id\": \"bd39049f-5e2a-4904-9571-68accae08aff\",\n              \"roleName\": \"Super Admin\",\n              \"privileges\": \"Manage users\"\n          }\n      \n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/roles/bd39049f-5e2a-4904-9571-68accae08aff"
      }
    ],
    "filename": "routes/roles.js",
    "groupTitle": "Role"
  },
  {
    "type": "post",
    "url": "/tenant",
    "title": "Create Tenant",
    "version": "1.0.0",
    "name": "Create_Tenant",
    "group": "Tenant",
    "description": "<p>Create Tenant.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"email\": \"test@company.com\",\"mobileNumber\"\":\"98989898989\",\"firstName\":\"kim\",\"lastName\":\"yen\",\"roleId\":\"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\"tenantCompanyName\": \"Agreeya Mobility\"}' http://<ip>:<port>/users\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>User's Mobile number.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's FirstName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's LastName.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>User's RoleId.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tenantCompanyName",
            "description": "<p>Tenant's Company Name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    \t{\n\t         \"email\": \"test@company.com\",\n          \"mobileNumber\": \"98989898989\",\n          \"firstName\":\"Kim\",\n          \"lastName\":\"yeon\",\n          \"roleId\":\"ec87094b-66b2-493c-b8d8-bb0f1a41aa56\",\n          \"tenantCompanyName\":\"Agreeya Mobility\"\n \n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TenantCompanyName",
            "description": "<p>CompanyName of the Tenant.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n     \"message\": \"Success\",\n    \"data\": {\n        \"id\": \"3d2d5614-69ce-4a9d-a975-154470dd81ad\",\n        \"email\": \"test@company.com\",\n        \"password\": \"d040f5e37bd3ef67061cba1323287d79c97080b5c2b294cd7e08f87fa45b1fe7\",\n        \"mobileNumber\": \"98989898989\",\n        \"status\": 1,\n        \"firstName\": \"kim\",\n        \"lastName\": \"yen\",\n        \"roleId\": \"ec87094b-66b2-493c-b8d8-bb0f1a41aa56\",\n        \"userId\": \"0bf527c2-e144-4644-8652-21baccee38d3\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/tenants"
      }
    ],
    "filename": "routes/tenant.js",
    "groupTitle": "Tenant"
  },
  {
    "type": "delete",
    "url": "/tenant/:id",
    "title": "Delete Tenant",
    "version": "1.0.0",
    "name": "DeleteTenant",
    "group": "Tenant",
    "description": "<p>Delete Tenant.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE  --data '{}' http://<ip>:<port>/tenants/bd39049f-5e2a-4904-9571-68accae08aff\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/tenants/bd39049f-5e2a-4904-9571-68accae08aff"
      }
    ],
    "filename": "routes/tenant.js",
    "groupTitle": "Tenant"
  },
  {
    "type": "get",
    "url": "/reports",
    "title": "Get All Report List of tenant",
    "version": "1.0.0",
    "name": "GetReportList",
    "group": "Tenant",
    "description": "<p>Get All Report List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3301/report?tenantId='' -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "TenantId",
            "defaultValue": "null",
            "description": "<p>Tenant Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parameterName",
            "description": "<p>Name of report parameter.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportId",
            "description": "<p>Report Id of report.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "Id",
            "description": "<p>report UUID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n  \t\"message\": \"Success\",\n \t \"data\": [\n      \t {\n            \"Id\":'7E70930F-E546-E811-80C3-000D3A117A02',\n            \"parameterName\":\"mileage\",\n            \"reportId\":'80a8d526-01a6-470c-a1bb-0620d7d4724a'\n            \"tenantId\": \"364f2214-5512-48b1-9669-ff03ed63c8c4\"                                 \n        },\n        {\n            \"Id\":'9BAB9DFE-E446-E811-80C3-000D3A117A02',\n            \"parameterName\":\"speed\",\n            \"reportId\":'80a8d526-01a6-470c-a1bb-0620d7d4724a'\n            \"tenantId\": \"364f2214-5512-48b1-9669-ff03ed63c8c4\"                                 \n        }\n  \t]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users"
      }
    ],
    "filename": "routes/report.js",
    "groupTitle": "Tenant"
  },
  {
    "type": "get",
    "url": "/tenant/:id",
    "title": "Get Tenant's Details",
    "version": "1.0.0",
    "name": "GetTenantDetails",
    "group": "Tenant",
    "description": "<p>Get Tenant's Details.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3301/tenants/1e280f86-b683-4b84-a837-069131f70ee4 -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "TenantCompanyName",
            "description": "<p>CompanyName of the Tenant.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "UserId",
            "description": "<p>Id of the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n       \"message\": \"Success\",\n       \"data\": {\n        \"id\": \"1e280f86-b683-4b84-a837-069131f70ee4\",\n        \"tenantCompanyName\": \"Microsoft\",\n        \"Users\": [\n            {\n                \"id\": \"6467fcb1-8982-4506-af61-361e99417baf\",\n                \"email\": \"superadmin@microsoft.com\",\n                \"password\": \"d040f5e37bd3ef67061cba1323287d79c97080b5c2b294cd7e08f87fa45b1fe7\",\n                \"mobileNumber\": \"0000000000\",\n                \"firstName\": \"Super\",\n                \"lastName\": \"Admin\",\n                \"status\": 1,\n                \"roleId\": \"29ad925d-737e-4199-9770-c2589709a0a4\"\n            }\n        ]\n    }\n\t   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/tenants/1e280f86-b683-4b84-a837-069131f70ee4"
      }
    ],
    "filename": "routes/tenant.js",
    "groupTitle": "Tenant"
  },
  {
    "type": "get",
    "url": "/tenant",
    "title": "Get All Tenant List",
    "version": "1.0.0",
    "name": "GetTenantList",
    "group": "Tenant",
    "description": "<p>Get All Tenant List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3301/tenant?limit=10 -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Users Page Number (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>Users List limit(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "defaultValue": "UserId",
            "description": "<p>Users Sorting on which field(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "order",
            "defaultValue": "asc",
            "description": "<p>Users Ordering field order(asc|desc)(optional).</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tenantCompanyName",
            "description": "<p>CompanyName of the Tenant.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n  \t\"message\": \"Success\",\n \t \"data\": [\n      \t{\n            \"id\":\"22e06e49-4fb5-4317-9114-29b6562b481d\",\n            \"tenantCompanyName\": \"Company-A\"\n        },\n        {\n            \"id\":\"66599bcb-30ad-40ad-b2c0-710a9d50f97a\",\n            \"tenantCompanyName\": \"Company-B\"\n        },\n        {\n            \"id\": \"bd39049f-5e2a-4904-9571-68accae08aff\",\n            \"tenantCompanyName\": \"Company-c\"\n        }\n  \t]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/tenants"
      }
    ],
    "filename": "routes/tenant.js",
    "groupTitle": "Tenant"
  },
  {
    "type": "put",
    "url": "/tenant/:id",
    "title": "Update Tenant",
    "version": "1.0.0",
    "name": "UpdateTenant",
    "group": "Tenant",
    "description": "<p>Update Tenant.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"tenantCompanyName\": \"Mobiliya\"}' http://<ip>:<port>/tenants/ece9135f-5f3c-4b72-bde1-ac2d574ac0f7\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tenantCompanyName",
            "description": "<p>TenantCompanyName User's TenantCompanyName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mobileNumber",
            "defaultValue": "null",
            "description": "<p>mobileNumber User's Mobile Number(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "defaultValue": "null",
            "description": "<p>firstName User's FirstName(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "defaultValue": "null",
            "description": "<p>lastName User's LastName(optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\t{\n       \n       \"tenantCompanyName\": \"AgreeYa Mobility\"\n       \"firstName\": \"jin\"\n       \"lastName\": \"hook\"\n       \"mobileNumber\": \"0987654322\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tenantCompanyName",
            "description": "<p>CompanyName of the Tenant.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>MobileNumber of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>FirstName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n     \"message\": \"Success\",\n\t\t \"data\": {\n        \"tenantUpdated\": {\n            \"tenantCompanyName\": \"AgreeYa Mobility\",\n            \"id\": \"ece9135f-5f3c-4b72-bde1-ac2d574ac0f7\"\n        },\n        \"userUpdated\": {\n            \"firstName\": \"jin \",\n            \"lastName\": \"hook\",\n            \"mobileNumber\": \"0987654322\"\n        }\n    }\n\t   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/tenants/22e06e49-4fb5-4317-9114-29b6562b481d"
      }
    ],
    "filename": "routes/tenant.js",
    "groupTitle": "Tenant"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "version": "1.0.0",
    "name": "Create_User",
    "group": "User",
    "description": "<p>Create User.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Autorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"email\": \"test@company.com\",\"mobileNumber\"\":\"98989898989\",\"firstName\":\"kim\",\"lastName\":\"yen\",\"tenantId\":\"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\",\"roleId\":\"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\"fleetId\":\"6467fcb1-8982-4506-af61-361e99417baf\"}' http://<ip>:<port>/users\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's Email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>User's Mobile number.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's FirstName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's LastName.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "licenseNumber",
            "description": "<p>Driver's license number.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area",
            "description": "<p>Area.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Assign Vehicle to driver.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>User's RoleId.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "fleetId",
            "description": "<p>User's FleetId.(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "tenantId",
            "description": "<p>User's TenantId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\t{\n       \n        \"email\": \"test@company.com\",\n       \"mobileNumber\": \"98989898989\",\n       \"firstName\":\"Kim\",\n       \"lastName\":\"yeon\",\n       \"roleId\":\"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\" \n       \"fleetId\":\"6467fcb1-8982-4506-af61-361e99417baf\",\n       \"tenantId\":\"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>MobileNumber of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "licenseNumber",
            "description": "<p>Driver's license number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "area",
            "description": "<p>Area.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "vehicleId",
            "description": "<p>Assign Vehicle to driver.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "fleetId",
            "description": "<p>FleetId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>RoleId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "tenantId",
            "description": "<p>TenantId of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n     \"message\": \"Success\",\n     \"data\": {\n        {\n        \"id\":\"5a2a8b63a4894865d03600a7,\n        \"email\": \"test@company.com\",\n        \"mobileNumber\": \"98989898989\",\n        \"status\": 1,\n        \"firstName\": \"kim\",\n        \"lastName\": \"yen\",\n        \"roleId\": \"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\n        \"fleetId\": \"6467fcb1-8982-4506-af61-361e99417baf\"\n        \"tenantId\": \"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "DeleteUser",
    "group": "User",
    "description": "<p>Delete User.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X DELETE  --data '{}' http://<ip>:<port>/users/4aedcab5-9413-4219-b09f-e652df7be3b6\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users/4aedcab5-9413-4219-b09f-e652df7be3b6"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User's Details",
    "version": "1.0.0",
    "name": "GetUserDetails",
    "group": "User",
    "description": "<p>Get User's Details.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3301/users/c678ec68-2c65-4ced-bdb6-0e34d9c245aa -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>MobileNumber of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>FirstName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "tenantId",
            "description": "<p>TenantId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>RoleId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "fleetId",
            "description": "<p>fleetId of the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Success\",\n   \"data\": {\n  \t\"id\":\"c678ec68-2c65-4ced-bdb6-0e34d9c245aa\",\n    \"email\": \"Test.11@company.com\",\n    \"mobileNumber\": \"0738557591\",\n    \"firstName\":\"samdung\",\n    \"lastName\":\"yeon\",\n    \"status\": 1,\n    \"roleId\": \"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\n    \"fleetId\": \"6467fcb1-8982-4506-af61-361e99417baf\",\n    \"Tenant\": {\n        \"id\": \"bd8d401d-1d46-4eea-afc0-8937b5ddf0fc\",\n        \"tenantCompanyName\": \"company\"\n    }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users/c678ec68-2c65-4ced-bdb6-0e34d9c245aa"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get All User List",
    "version": "1.0.0",
    "name": "GetUserList",
    "group": "User",
    "description": "<p>Get All User List.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X GET  -d \"\" http://localhost:3301/users?limit=10&sort=FirstName&order=desc -H \"Autherization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "0",
            "description": "<p>Users Page Number (optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "10",
            "description": "<p>Users List limit(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "defaultValue": "FirstName",
            "description": "<p>Users Sorting on which field(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "order",
            "defaultValue": "asc",
            "description": "<p>Users Ordering field order(asc|desc)(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "defaultValue": "null",
            "description": "<p>User's email (asc|desc)(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": true,
            "field": "roleId",
            "description": "<p>User's roleId (asc|desc)(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": true,
            "field": "fleetId",
            "description": "<p>User's fleetId (asc|desc)(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isSelf",
            "description": "<p>Get self information (true|false)(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isDriverAssign",
            "description": "<p>Get list of driver(assign/unassign) (1|0)(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "isFleetUnAssign",
            "description": "<p>Get list of assign/unassign (true/false)(optional)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>MobileNumber of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>FirstName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "fleetId",
            "description": "<p>FleetId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>RoleId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "tenantId",
            "description": "<p>TenantId of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n  \t\"message\": \"Success\",\n \t \"data\": [\n      \t {\n            \"id\": \"33e345e6-83e7-404c-b067-f08c8e1ef79e\",\n            \"email\": \"Test.15@company.com\",\n            \"mobileNumber\": \"0234557591\",\n            \"firstName\": pisuk,\n            \"lastName\": yen,\n            \"status\": 1,\n            \"roleId\": \"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6\",\n            \"fleetId\": \"29ad925d-737e-4199-9770-c2589709a0a4\",            \n            \"tenantId\": \"bc313a62-fdf9-4e66-8c22-a84c91f60aa4\"                                   \"\n        },\n        {\n            \"id\":\"9a64d906-722d-40d0-8872-25f82fab4161\",\n            \"email\": \"Test.16@company.com\",\n            \"mobileNumber\": \"0238557591\",\n            \"firstName\": jin,\n            \"lastName\": hook,\n            \"status\": 1,\n            \"roleId\": \"69f375e6-686a-447f-b184-1cfc91b6db68\",\n            \"fleetId\": \"1e280f86-b683-4b84-a837-069131f70ee4\",            \n            \"tenantId\": \"364f2214-5512-48b1-9669-ff03ed63c8c4\"                                 \n        }\n  \t]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update User",
    "version": "1.0.0",
    "name": "UpdateUser",
    "group": "User",
    "description": "<p>Update User.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"mobileNumber\": \"9876547890\",\"firstName\":\"jin\",\"lastName\":\"hook\"}' http://<ip>:<port>/users/22e06e49-4fb5-4317-9114-29b6562b481d\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mobileNumber",
            "defaultValue": "null",
            "description": "<p>mobileNumber User's Mobile Number(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "defaultValue": "null",
            "description": "<p>firstName User's FirstName(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "defaultValue": "null",
            "description": "<p>lastName User's LastName(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": true,
            "field": "roleId",
            "defaultValue": "null",
            "description": "<p>roleId User's RoleId(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": true,
            "field": "fleetId",
            "defaultValue": "null",
            "description": "<p>fleetId User's FleetId(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": true,
            "field": "tenantId",
            "defaultValue": "null",
            "description": "<p>tenantId User's TenantId(optional).</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isRemoveFleet",
            "description": "<p>Delete Fleet associated with Fleet Admin (optional).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\t{\n       \n       \"mobileNumber\": \"98989898989\",\n       \"firstName\":\"Kim\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>MobileNumber of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>FirstName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "roleId",
            "description": "<p>RoleId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "fleetId",
            "description": "<p>FleetId of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "tenantId",
            "description": "<p>tenantId of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n     \"message\": \"Success\",\n     \"data\": {\n        {\n        \"id\":\"22e06e49-4fb5-4317-9114-29b6562b481d,\n        \"mobileNumber\": \"98989898989\",\n        \"firstName\": \"kim\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users/22e06e49-4fb5-4317-9114-29b6562b481d"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/",
    "title": "Update Multilpe User",
    "version": "1.0.0",
    "name": "Update_Multiple_User",
    "group": "User",
    "description": "<p>Update Multiple User.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i -X POST  --data '{\"userIdList\":[\"d7ed14a9-df4c-4099-adcd-ec426845374e,d7ed14a9-df4c-4099-adcd-ec426845374e\"]}' http://<ip>:<port>/users/\n-H \"Authorization:<access-token>\" -H \"Content-Type: application/json\"",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID[]",
            "optional": false,
            "field": "userIdList",
            "description": "<p>List of user Id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\t{\n       \n       \"userIdList\": [\"d7ed14a9-df4c-4099-adcd-ec426845374e,d7ed14a9-df4c-4099-adcd-ec426845374e\"]\n       \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid request parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The User token was invalid.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The Internal Server Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"message\": \"Invalid request parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"message\": \"Unauthorized.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   \"message\": \"InternalServerError\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n     \"message\": \"Success\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/users/"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
