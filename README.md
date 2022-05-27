# OpenThyroo 🖥

OpenThyroo is an open source project that allows users to interact with each other, ask questions, do business and communicate via messages internally. OpenThyroo is also a developer for those developers who want to participate in an open source project and gain experience for future jobs.

The project uses:
Angular 2+ in version 12 - FrontEnd
ASP.NET Core 3.1 Back End
Users can choose to use MySQL or MSSQL.

This project also comes with certain bugs which, thanks to everyone's collaboration, we can build a more robust and interesting platform. The code is totally thanks and free.

- Characteristics of the project.
- Posting of questions
- Connection between users
- Messaging between users (if they are contacts)
- Business page
- Interests between users and pages
- Voting (likes/comments)
- Groups
- Marketing (like facebook)
- Notifications (Like on LinkedIn, when someone views your profile or sends you a message)

If you like this project, don't hesitate to enter our slack and be part of the developer community, you can also follow me on twitter, follow my posts on dev.to, among others.
If you want to learn, and get some extra experience, this open source project is for you.

- ✅ Improvements 
- ✅ Bugs
- ✅ Growth
- ✅ Testing

```
cd thyroo-spa
npm install
```
Once we have completed this process we can run
```
ng serve -o
```
Create a database in MySQL or MSSQL and run the first migration.

```
dotnet ef migrations add InitialCreate
```
Verify, your database contains the right information, if you need help with this process, please feel free to ask in our slack channel https://OpenThyroo.slack.com

After this, we can open .NET solution. You should be able to see everything just one click. you can navigate to.

```
thyroo-api\thyroo-api
dotnet watch run
```
