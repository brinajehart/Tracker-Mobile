# Getting started

### Requirements
- Node >= 14
- OpenJDK >= 14
- ADB - Android Studio emulator
- Yarn

### Install packages
Run `yarn` in terminal

### Run the app in emulator
Run `yarn android` in terminal - it should open the android studio emulator and install the app

### API requirements
- Apache server, Mysql server (one option is XAMPP)
- Configure apache config in xampp `control panel -> apache -> config -> httpd.conf` and replace port 80 with port 5055
- Clone: https://github.com/JanezSedeljsak/invoice-manager into your apache server (C:\xampp\htdocs) - everything needs to be in the root folder of the server
- Run the `db.sql` file in your DBMS to create the database with some mock data.

### Connect API with emulator
- We need to expose the API to the mobile emulator - run:
```bash
adb -s emulator-5554 reverse tcp:5055 tcp:5055
```

Now you should be able to login, register and use the app you can try with
```
email: john.doe@gmail.com
pass: geslo123
```

