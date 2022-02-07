# Lynx

![photo of the home screen](https://github.com/jpknwls/Lynx/blob/main/include/lynx-home.png?raw=true)


## Purpose

I wanted to make a simple CRUD app on top of Django and React that would provide a surface for me to experiment with Tailwind on top of, as well as deepen my understanding of Django and React. The brevity of Tailwind’s declarative nature mirrored SwiftUI’s view modifiers (a pattern I like), and I wanted to explore using Tailwind within a project. I chose as simple a model as I could, to ease the logic so I could focus on API, Component and Tailwind declaration. I also wanted to work with the authorization flow in React, so I used the following [tutorial](https://dev.to/koladev/django-rest-authentication-cmh).

## Stack

- SQL
- Django
- React
- Tailwind
- Netlify

## Design

The app follows a standard authorization shape, with a Root Component that provides authorization protection to the /*profile*/ route and with routes /*login*/ and /*register*/ handling adding and signing in users. The /*profile*/ route provides user the ability to edit add, remove and reorder their ***Lynx,*** while the /*{username}*/ route displays these ***Lynx*** in a list. 

### Routes

- /

Landing page

- /login/
Handles login

- /register/
Handles registration

- /profile/
Provides user the ability to edit add, remove and reorder their ***Lynx***

- /{username}/
Displays a user’s ***Lynx*** in a list.

#### Login Screen
![photo of the login screen](https://github.com/jpknwls/Lynx/blob/main/include/lynx-login.png?raw=true)
#### Profile Screen
![photo of the profile screen](https://github.com/jpknwls/Lynx/blob/main/include/lynx-profile.png?raw=true)
