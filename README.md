# Lynx

![photo of the home screen](https://github.com/jpknwls/Lynx/blob/main/include/lynx-home.png?raw=true)


## Purpose

Lynx is a CRUD app built with Django and React. It's purpose is to a) experiment with Tailwind, b) deepen my understanding of Django and React and c) learn about authorization flow in React/Django ([following this](https://dev.to/koladev/django-rest-authentication-cmh)). The brevity of Tailwind’s declarative nature mirrored SwiftUI’s view modifiers, a pattern I like, and made component stylization very similar to that in SwiftUI.   I chose as simple a model as I could to ease the logic, so I could focus on the API, Components and Tailwind declaration. 

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
