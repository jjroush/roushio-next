---
title: AWS Lambda Provisioned Concurrency
date: '2019-12-30'
keywords: 'AWS, lambda, warm, serverless functions'
---
![Lambda on the Beach](https://roush-image.s3.amazonaws.com/Lambda-provisioned.png)

A big tradeoff for implementing a serverless architecture is cold start times. 

The serverless cold-start tax is typically within a few hundred milliseconds but it has been reported that Lambdas executed in the AWS VPC environment to take an upwards of seconds. 

A _very scientific_ test I conducted on my own serverless function found that the total round-trip time for my email sign-up lambda was around **1500ms cold** as opposed to **650ms warm**. 

In some contexts like user-facing, this cold-start time has a huge impact. AWS announced a solution at their recent re:Invent conference on December 3rd. [Provisioned Concurrency](https://aws.amazon.com/about-aws/whats-new/2019/12/aws-lambda-announces-provisioned-concurrency/) provides AWS users with more control of their serverless platform and **guarantees that a serverless function will be invoked within 100 ms** as long as it is within the allocated concurrency.

# Function Warming

Lambdas execute within a container which is created upon a trigger of an HTTP request, S3 event, etc. The time it takes for AWS to stand up the execution environment is considered the cold-start time. Lambda is smart enough to reuse a container that has already been stood up. 

If 2 Lambda triggers are done one after another, only a single Lambda container is created and only the first call experiences the cold start. This differs from 2 request done concurrently where Lambda will stand up two Lambda Containers and both executions will experience the cold start. 

Consistent and regular traffic to Lambda ensures less total requests are impacted by cold-start time.

# Provisioned Concurrency

Provisioning Concurrency tells AWS Lambda to prepare a set a specified amount of execution environments. Request will use the already stood up environments and only when execution concurrency is greater than the provisioned concurrency, new environments are created.  

Provisioned Concurrency guarantees that execution start time (ms) is within double-digits for all allocated request.

# Usage

Should you use provisioned concurrency? It depends. 

Provisioned concurrency gives up some of the advantages which are typically inherent with a FAAS (Function as a Service) model for guaranteed execution speed.

## Provisioned Concurrency Cons

1. **Have to Plan Usage** - A fundamental of serverless is not having to predict usage of a service as scaling is completely controlled by the platform on a per-request basis. In order to take full advantage of provisioned concurrency, usage has to be planned.
2. **No More Scaling down to zero** - Another advantage touted by FAAS is that you only pay for what you use in execution time. When using provisioned concurrency, you pay for what is provisioned no matter if it being used or not.
3. **Greater architecture problems** - This is specific to application. If provisioned concurrency is used in order to speed up an operation that is blocking other software or a mission-critical operation, developers should consider the cost of fixing architecture before implementation of provisioned concurrency. 

## When to use it

While there are cons which should be considered before utilizing provisioned concurrency, it was built into AWS lambda for a reason. There are scenarios when provisioned currency can be justified. When the cost of re-architecting software to handle latency is greater than the cost of implementing provisioned concurrency. Or when the extra cost is worth minimizing cold start to double-digit times, like in user-facing applications.

# Future of Serverless

Seeing the development of serverless features like provisioned concurrency at AWS re:Invent shows how serverless will continue to mature and it will be interesting to see how other serverless platforms like Google's Cloud Functions and Azure Function respond. 

# Learn More

[AWS Provisioned Concurrency Announcement](https://aws.amazon.com/about-aws/whats-new/2019/12/aws-lambda-announces-provisioned-concurrency/)

[AWS Blog post testing comparing performance of Lambda Function with provisioned concurrency.](https://aws.amazon.com/blogs/aws/new-provisioned-concurrency-for-lambda-functions/) 

[Lambda Cold Starts In-depth](https://mikhail.io/serverless/coldstarts/aws/)

