# Application using Spring Boot, React, OAuth2, MySQL 

![App Screenshot](documentaion/screenshoot.png)

# SpringSocial WebApp
- web application
- provides CRUD operations on groceries & countries
    - add grocery/country
    - delete grocery/country
- provides: basic login/register, login through facebook, view profile and logout

## Detail Description of the app
The application is a platform that has the client-server architecture offering CRUD 
functionalities to the client through API (Application Programming Interface) requests. It is a 
web application built in React which consumes REST services exposed by the application server. 
It provides the possibility to login with credentials or through using an access token for facebook.

### Technologies:
- frontend: ReactJS
- backend: Java
- database: Mysql

## run docker-compose 
```
in root: docker-compose up
```

## Access the application within the browser
```
(run docker-compose up before)
open browser (any) and access: localhost:3000
```

## Configure mysql db with bind address and date time zone
```
On MacOS: sudo nano /etc/my.cnf 
add:
-bind-address:0.0.0.0
-date-time-zone: +03.00
```

## Configure the application.yml depending on ways of running
```
Open spring-social/src/resources/application.yml

Uncomment 

spring:
    datasource:
        #url

depending on your preferences of running the applications
```

## Use case UML diagram
## 1
![Use Case UML Screenshot](documentation/UseCaseUMLDiagram.png)

## 2
![Use Case UML Screenshot 2](documentation/UMLCaseDiagramPUML.png)

## C4Model

## System Context diagram
![SystemContextDiagram Screenshot2](documentation/ContextDiagram.png)

## (Mermaid)
```mermaid
    graph TB
        SpringSocialUser(["SpringSocial User [Person] - an user of the SpringSocial App"])
        UsersSystem["Users System [Software System]] - provides login/register operations on user"]
        GroceriesSystem("Groceries System [Software System] - provides CRUD operations on groceries")
        CountriesSystem("Countries System [Software System] - provides CRUD operations on countries")
        
        SpringSocialUser-->|"makes login/register operations using"|UsersSystem
        SpringSocialUser-->|"makes CRUD operations using"|GroceriesSystem
        SpringSocialUser-->|"makes CRUD operations using"|CountriesSystem

        UsersSystem-.->|"reads from and writes to"|MysqlSystem
        GroceriesSystem-.->|"reads from and writes to"|MysqlSystem
        CountriesSystem-.->|"reads from and writes to"|MysqlSystem

        classDef user fill:#008a09,stroke:#fff;
        classDef mainSystem fill:#00338,stroke:#fff;
        classDef externalSystem fill:grey,stroke:#fff;
        class SpringSocialUser user;
        class GroceriesSystem,CountriesSystem,UsersSystem mainSystem;
        class MysqlSystem externalSystem;
```

## Container diagram
![SystemContextDiagram Screenshot2](documentation/ContainerDiagram.png)

## (Mermaid)
```mermaid
    graph TB
        User(["SpringSocial User [Person] - an user of the SpringSocial App"])

        subgraph "SpringSocial System [Software System]"
        SPAContainer("Single-Page Application [Container: TypeScript and ReactJS] - provides all of the SpringSocial functionality to customers via their web browser")
        APIContainer("API Application [Container: Java] - provides the SpringSocial functionalities via a JSON/HTTP API")
        end

        MysqlSystem[("Mysql [Software System] - stores groceries & users & countries")]

        SpringSocialUser-.->|"visits springsocial.com"|SPAContainer
        SPAContainer-.->|"makes API calls to"|APIContainer
        APIContainer-.->|"reads from and writes to"|MysqlSystem

        classDef user fill:#008a09,stroke:#fff;
        classDef container fill:#0066cc,stroke:#fff;
        classDef externalSystem fill:grey,stroke:#fff;
        class SpringSocialUser user;
        class SPAContainer,APIContainer container;
        class MysqlSystem externalSystem;
```

## Component diagram

### API Application [Container: Java]
![SystemComponentDiagram Screenshot2](documentation/Component1Diagram.png)

```mermaid
    graph TB
        SPAContainer("Single-Page Application [Container: TypeScript and ReactJS] - provides all of the SpringSocial functionality to customers via their web browser")

        subgraph "API Application [Container: Java]"
        UserControllerComponent("Country Controller [Component: REST Controller] - allows users to perform login/register operations on users")
        CountryControllerComponent("Country Controller [Component: REST Controller] - allows users to perform CRUD operations on countries")
        GroceryControllerComponent("Grocery Controller [Component: REST Controller] - allows users to perform CRUD operations on groceries")
        UserRepositoryComponent("Country Controller [Component: Repository class] - repository users")
        CountryRepositoryComponent("Country Repository [Component: Repository Class] - repository countries")
        GroceryRepositoryComponent("Grocery Repository [Component: Repository Class] - repository groceries")
        SpringSocialModelsComponent("SpringSocial Models [Component: Model Classes] - defines DTOs for users & countries & groceries")
        end

        MysqlSystem[("Mysql [Software System] - stores users & countries & groceries")]

        SPAContainer-.->|"makes API calls to"|UserControllerComponent
        SPAContainer-.->|"makes API calls to"|CountryControllerComponent
        SPAContainer-.->|"makes API calls to"|GroceryControllerComponent

        UserControllerComponent-.->|"uses"|UserRepositoryComponent
        CountryControllerComponent-.->|"uses"|CountryRepositoryComponent
        GroceryControllerComponent-.->|"uses"|GroceryRepositoryComponent
        UserRepositoryComponent-.->|"uses"|SpringSocialModelsComponent
        CountryRepositoryComponent-.->|"uses"|SpringSocialModelsComponent
        GroceryRepositoryComponent-.->|"uses"|SpringSocialModelsComponent
        UserRepositoryComponent-.->|"reads from and writes to"|MysqlSystem
        CountryRepositoryComponent-.->|"reads from and writes to"|MysqlSystem
        GroceryRepositoryComponent-.->|"reads from and writes to"|MysqlSystem

        classDef container fill:#0066cc,stroke:#fff;
        classDef component fill:#3399ff,stroke:#fff;
        classDef externalSystem fill:grey,stroke:#fff;
        class SPAContainer container;
        class UserControllerComponent,CountryControllerComponent,GroceryControllerComponent,UserRepositoryComponent,CountryRepositoryComponent,GroceryRepositoryComponent component;
        class MysqlSystem externalSystem;
```

### Single-Page Application [Container: TypeScript and ReactJS]
![SystemComponentDiagram Screenshot3](documentation/Component2Diagram.png)
```mermaid
    graph TB
        APIContainer("API Application [Container: Java] - provides the SpringSocial functionality via a JSON/HTTP API")
        
        subgraph "Single-Page Application [Container: TypeScript and ReactJS]"
        APIUtilsComponent("APIUtils [Component: ReactJS] - makes API calls to a server")
        CommonComponent("Common Component [Component: Helper Classes] - defines helper classes")
        CountriesComponent("Countries Component [Component: ReactJS] - defines components & templates for the countries list")
        GroceriesComponent("Groceries Component [Component: ReactJS] - defines components & templates for the groceries list")
        UsersComponent("Users Component [Componen: ReactJS] - defines components & templates for the users list")
        ModelsComponent("Models Component [Component: Model Classes] - defines model classes for users & countrie & groceries")
        end

        MysqlSystem[("Mysql [Software System] - stores users & groceries & countries")]

        APIUtilsComponent-.->|"makes API calls to"|APIContainer
        APIContainer-.->|"reads from and writes to"|FirestoreSystem

        UsersComponent-.->|"requests data using"|APIUtilsComponent
        UsersComponent-.->|"uses"|CommonComponent
        UsersComponent-.->|"uses"|ModelsComponent
        CountriesComponent-.->|"requests data using"|APIUtilsComponent
        CountriesComponent-.->|"uses"|CommonComponent
        CountriesComponent-.->|"uses"|ModelsComponent
        GroceriesComponent-.->|"requests data using"|APIUtilsComponent
        GroceriesComponent-.->|"uses"|CommonComponent
        GroceriesComponent-.->|"uses"|ModelsComponent

        classDef container fill:#0066cc,stroke:#fff;
        classDef component fill:#3399ff,stroke:#fff;
        classDef externalSystem fill:grey,stroke:#fff;
        class APIContainer container;
        class APIUtilsComponent,CommonComponent,UsersComponent,CountriesComponent,GroceriesComponent,ModelsComponent component;
        class MysqlSystem externalSystem;
```

## Code
### API Application [Container: Java]
![CodeDiagram Screenshot1](documentation/Code1.png)

### Single-Page Application [Container: TypeScript and ReactJS]
![CodeDiagram Screenshot](documentation/Code.png)

## SoaML diagram
![SoaML Screenshot](documentation/SoaML.jpg)

## Sytem Context diagraam (Usual)
![SystemContextDiagram Screenshot](documentation/SystemContextDiagram.jpeg)

## Container diagram (Usual)
![ContainerDiagram Screenshot](documentation/ContainerDiagram.jpg)


## UBB Cluj-Napoca - Faculty of Mathematics and Computer Science

### Software Engineering, 2020 - 2022

- 1st year - 2nd semester
- Software Design - Assessment