# Microservices

## Issue
The scope of the system has grown, and it now encompasses multiple subdomains within the problem space of a hackathon management. At this point, a decision has to be made whether we want to continue developing a monolothic server to handle all the functionality, or to split up the application into microservices.

## Decision
As of the time of writing this, we have decided to pursue a microservices architecture.

## Consequences
 - (Good) Small services that own a single subdomain's data and business rules.
 - (Good) Ability to develop and operate each service with full autonomy
 - (Good) Each service can be owned by separate developers or teams.
 - (Good) Considering the variation in traffic across the subdomains, the microservices can be deployed and scaled independently of each other, making overall performance flexible.
 - (Good) Services can be tested independently resulting in simpler distributed testing suites.
 - (Good) Strictly defined service contracts will ensure reliability
 - (Good) Learning opportunity for distributed systems and domain level separation.
 - (Bad) Increases the learning curve for new developers being onboarded and trained.
 - (Bad) More network level communication will result in decreased system performance.
 - (Bad) Multiple services and databases need to be monitored.
