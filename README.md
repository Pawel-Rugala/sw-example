# How the repository is organized

It's a monorepo using [PNPM workspace](https://pnpm.io/workspaces).

- `common/`: Shared code between the different packages.
- `apps/`: Separate applications:
  - `express`: it's a REST express application. `Please focus on this one`
  - `terraform`: it's a simple terraform for AWS EC2 instance + including CICD. Again done within 30mins so it's nothing special. Just to showcase that I know how to use terraform. 
  - `aws-ql`: serverless GraphQL application using AWS services but `it's sunday evening and I had not time to finish it.` Nonetheless it should be already enough to decide if someone knows aws cdk`

## Pre-requisites
- Node.js v20.x.x
- Docker with docker-compose
- [PNPM](https://pnpm.io/installation)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

## Express app (REST)

**How to run the express application**

1. You don't need any environment variables to run the application.
2. You need to have a running mongodb instance. You can use the following command to run a mongodb instance using docker-compose:

In project root folder jus run the following command:
```bash
pnpm mongodb
```
3. In project root folder just run the following command:
```bash
pnpm express
```

**How to test the express application**

Test use MongoDB in-memory db to run the tests. You don't need to have a running mongodb instance.

```bash
pnpm express:u # Unit Tests -> not many because I was focusing on integration tests
pnpm express:i # Integration Tests -> I was heavily relying on integration tests because of a time constraint
```

**OpenAPI specification**

I never used before zod-to-openapi it was more a test for me if this is useful for future.
However now I see that it's not very useful and I'm leaving this as is... sorry!

I was not using swagger-ui or anything like that.
The openAPI specification is available at endpoint `/v1/openapi`
You can import the openAPI specification in tools like Postman, Insomnia or any Swagger editor.
Everything will be documented there.

I thought it would be better to present how to auto generate this specification.

### Some notes worth mentioning

**Why mongodb has duplicated records in various collections**
> It's quite common optimization technique in NoSQL databases to duplicate data in various collections to avoid joins.
> Joins are very expensive operations in NoSQL databases. So, it's better to duplicate data in various collections to avoid it
> You can read more about it here [Best Practices for MongoDB Performance](https://www.mongodb.com/resources/products/capabilities/performance-best-practices) and [Embedding MongoDB](https://www.mongodb.com/resources/products/fundamentals/embedded-mongodb)

**Pagination**
The way it is implemented it's not the best way to implement pagination using mongoDB.
It's just not optimized ok we have results per page always the same howerver It's quite slow
as each time query trigger full scan of collection.

You can read more about it here
- [MongoDB Pagination: Fast & Consistent](https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3)
- [MongoDB Iterate Your Cursor](https://www.mongodb.com/docs/atlas/atlas-search/tutorial/iterate-cursor-tutorial/#std-label-iterate-cursor-tutorial)
 
**Project organization**

Please keep in mind that the project was done in a rush.
The project is not organize in any particular form or framework. 
It is not a hexagonal, DDD or any other layered architecture.
It's just a simple project to demonstrate:
- Dependency injection (I'm not using any IoC containers just in case you are wondering)
- How to validate request and have proper typescript types for the params, query, body, etc.
- How to test the application
- Auto generate API documentation (openAPI + zod)

## Terraform
**Things worth mentioning**
- Github Actions are using OIDC authentication with AWS. You don't have to store any credentials in the repository. Only IAM role is enough!
- SSH is allowed only within AWS console. You can't SSH from your local machine to the instance.
- The instance is running in public subnet for simplicity. It should be running in private subnet with NAT gateway.

## Final note:
- Please keep in mind this was built over weekend (few hours) and it's 22k LoC (w/o node_modules)
