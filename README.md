<a name="readme-top"></a>

![music-store-high-resolution-logo-color-on-transparent-background](https://github.com/ahmedeid6842/music-store/assets/57197702/328ee35e-e2b3-40d4-b6df-b8e54e27f091)

<br>
<br>

<h1 align="center">Music Store</h1>


### 📑 Table of Contents
- [📘 Introduction](#introduction)
- [💻 Getting Started](#getting-started)
  - [Prerequisites ❗](#prerequisites)
  - [Environment Variables :key:](#environment-variables)
  - [Setup ⬇️](#setup)
  - [Install :heavy_check_mark: ](#install)
  - [Usage 🤿 🏃‍♂️](#usage)
- [🔍 APIs Reference](#api-reference)
- [🏗️🔨 Database ERD](#erd)
- [🔄 Authentication Sequence Diagrams](#sequence-diagram)
- [📐 UML Diagram](#uml-diagram)
- [👥 Author](#author)
- [🤝 Contributing](#contribution)
- [👀 Kanban Board](#kanban-board) 
- [⭐️ Show Your Support](#support)
- [🔭 Up Next](#up-next)
- [💎 Lessons Learned](#lessons-learned)
- [🙏 Acknowledgements](#acknowledgements)
- [📜 License ](#license)


## 📘 Introduction <a name="introduction"></a>
<p align="center">
🎻 Conduct your music empire! 🎧 Music Store is your one-stop API to manage artists, albums, and songs. ✨ Search, filter, integrate - it's your musical symphony. 🎶
</p>

<p align="center">
  Welcome to Music Store API, a powerful and efficient REST API built with NestJS that serves as your ultimate solution for managing your music empire. With Music Store API, you can easily organize and control your artists, albums, and songs, creating a seamless and immersive musical experience for your users.
</p>

<p align="center">
  Music Store API prioritizes the security and reliability of your music assets. The API implements robust authentication mechanisms, ensuring secure access to your music collection. With built-in security features, you can protect sensitive data and provide a safe environment for your users' musical journey.
</p>

## 💻 Getting Started <a name="getting-started"></a>
To get a local copy up and running, follow these steps.

### Prerequisites ❗<a name="prerequisites"></a>

In order to run this project you need:
<p>
 
<a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=ts,nodejs,mysql&theme=dark"/>
    </a>
    <a href="https://www.npmjs.com/"><img src="https://authy.com/wp-content/uploads/npm-logo.png" width="50px" height="50"/></a>

 </p>

### Environment Variables :key: <a name="environment-variables"></a>
- `DATABASE_HOST`:  the mysql host (e.g. localhost)
- `DATABASE_PORT`: the port on which mysql are working on (e.g. 3306)
- `DATABASE_USERNAME`: your mysql username (e.g. mysql)
- `DATABASE_PASSWORD`: your mysql password (e.g. root)
- `DATABASE_NAME`: the database name on which the project will use (e.g. MusicStore)
- `JWT_SECRET`: the json web token signature to create or validate token (e.g. jwtsecret)
- `COOKIE_SESSION_SECRET`: your cookie session secret (e.g sessionsecret)

### Setup ⬇️ <a name="setup"></a>
1. Clone the repository:
```shell
   git clone https://github.com/ahmedeid6842/music-store
```
2. Change to the project directory:
```shell
cd ./music-store
```

### Install :heavy_check_mark: <a name="install"></a>
Install the project dependencies using NPM:

```shell
npm install
```

### Usage 🤿 🏃‍♂️ <a name="usage"></a>

To start the application in development mode, run the following command:

```shell
npm run start:dev
```

The application will be accessible at http://localhost:3000.

- Alright, it's showtime! 🔥 Hit `http://localhost:3000` and BOOM! 💥  You should see the docs page and the **Music Store** APIs working flawlessly. ✨🧙‍♂️

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## [API reference](https://documenter.getpostman.com/view/10444163/2s9YeN18cS#26b3aaa9-f8c1-40bf-b570-2922aebb44e9)

This section provides detailed documentation and examples for the API endpoints used in the **Music Store** backend project.
You can Hit this [Link](https://documenter.getpostman.com/view/10444163/2s9YeN18cS#26b3aaa9-f8c1-40bf-b570-2922aebb44e9) to view the documentation.
![Screenshot from 2023-12-07 21-30-57](https://github.com/ahmedeid6842/music-store/assets/57197702/653cf61b-b477-4cb0-bc03-7e054cdf770b)

![ERD-V2](https://github.com/ahmedeid6842/music-store/assets/57197702/91ad8ec8-4047-4c38-8dc5-6b2f5b2907e6)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔄 Authentication Sequence Diagrams <a name="sequence-diagram"></a>

<div align="center"> <h3> Auth Module </h3> </div>

```mermaid
sequenceDiagram
    participant User
    participant AuthController
    participant AuthService
    participant UsersService
    participant EmailService
    participant JwtService

    User->>+AuthController: register()
    AuthController->>+AuthService: register(userCredentials)
    AuthService->>+UsersService: createUser(userCredentials)
    UsersService-->>-AuthService: user
    AuthService->>+EmailService: sendRegistrationEmail(user)
    EmailService-->>-AuthService: emailSent
    AuthService-->>-AuthController: registrationSuccess

    User->>+AuthController: login(credentials)
    AuthController->>+AuthService: login(credentials)
    AuthService->>+UsersService: getUserByEmail(email)
    UsersService-->>-AuthService: user
    AuthService->>+AuthService: comparePasswords(password, user.password)
    AuthService->>+JwtService: generateToken(user)
    JwtService-->>-AuthService: token
    AuthService-->>-AuthController: loginSuccess(token)

    User->>+AuthController: requestPasswordReset(email)
    AuthController->>+AuthService: requestPasswordReset(email)
    AuthService->>+UsersService: getUserByEmail(email)
    UsersService-->>-AuthService: user
    AuthService->>+AuthService: generatePasswordResetToken(user)
    AuthService->>+EmailService: sendPasswordResetEmail(user, resetToken)
    EmailService-->>-AuthService: emailSent
    AuthService-->>-AuthController: passwordResetEmailSent()

    User->>+AuthController: resetPassword(resetToken, newPassword)
    AuthController->>+AuthService: resetPassword(resetToken, newPassword)
    AuthService->>+AuthService: verifyPasswordResetToken(resetToken)
    AuthService->>+UsersService: getUserById(userId)
    UsersService-->>-AuthService: user
    AuthService->>+AuthService: hashPassword(newPassword)
    AuthService->>+UsersService: updatePassword(user, hashedPassword)
    UsersService-->>-AuthService: updatedUser
    AuthService-->>-AuthController: passwordResetSuccess()

    User->>+AuthController: verifyEmail(email, verificationCode)
    AuthController->>+AuthService: verifyEmail(email, verificationCode)
    AuthService->>+UsersService: getUserByEmail(email)
    UsersService-->>-AuthService: user
    AuthService->>+AuthService: verifyEmail(user, verificationCode)
    AuthService->>+UsersService: updateUserVerification(user)
    UsersService-->>-AuthService: updatedUser
    AuthService-->>-AuthController: emailVerificationSuccess()

    User->>+AuthController: logout()
    AuthController->>+AuthService: logout()
    AuthService-->>-AuthController: logoutSuccess()
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📐 UML Diagram <a name="uml-diagram"></a>

```mermaid
classDiagram
    class UsersService {
        + create(email: string, userName: string, password: string, verificationCode: string, verificationCodeExpiresAt: Date): void
        + findOne(id: string)
        + find(email?: string, userName?: string)
        + update(userId: string, attrs: Partial<User>)
    }

    class User {
        + id: string
        + email: string
        + userName: string
        + password: string
        + verificationCode: string
        + verificationCodeExpiresAt: Date
    }

    class CreateUserDto {
        + email: string
        + password: string
        + userName: string
    }

    class AuthService {
        + register(userData: CreateUserDto): void
        + verifyEmail(email: string, verificationCode: string): void
        + login(userCredentials: LoginUserDto): string
        + sendResetPasswordEmail(userData: any): void
        + resetPassword(token: string, password: string): void
        - generateResetPasswordToken(userId: string): string
        - generateVerificationCode(): string
        - generateVerificationCodeExpiration(): Date
    }

    class EmailService {
        - email: string
        - password: string
        + sendResetPasswordEmail(email: string, resetPasswordUrl: string): void
        + sendVerificationEmail(email: string, verificationCode: string): void
    }

    class ArtistService {
        + createArtist(artist: CreateArtistDto, user: UserDto): void
        + getArtist(query: GetArtistQueryDto): Artist[]
        + updateArtist(artist: PartialArtistDto, user: UserDto): void
    }

    class Artist {
        + id: string
        + name: string
        + bio: string
        + user: User
    }

    class AlbumService {
        + createAlbum(albumBody: CreateAlbumDto, artist: Artist): void
        + getAlbums(query: GetAlbumQueryDto): Album[]
        + updateAlbum(albumId: string, albumBody: PartialAlbumDto): void
        + deleteAlbum(albumId: string): void
    }

    class Album {
        + id: string
        + title: string
        + artworkUrl: string
        + artist: Artist
    }

    class SongService {
        + createSong(newSong: CreateSongDto, artist: Artist): void
        + getSongs(query: GetSongQueryDto): Song[]
        + updateSong(songId: string, newSong: PartialSongDto): void
        + deleteSong(songId: string): void
    }

    class Song {
        + id: string
        + title: string
        + duration: number
        + album: Album
        + artists: Artist[]
    }

    UsersService --> User: Manages
    AuthService --> UsersService: Depends on
    AuthService --> EmailService: Depends on
    ArtistService --> Artist: Manages
    ArtistService --> UsersService: Uses
    AlbumService --> Album: Manages
    AlbumService --> ArtistService: Uses
    SongService --> ArtistService: Uses
    SongService --> Song: Manages

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👤 Author <a name="author"></a>
**Ahmed Eid 🙋‍♂️**
- Github: [@ahmedeid6842](https://github.com/ahmedeid6842/)
- LinkedIn : [Ahmed Eid](https://www.linkedin.com/in/ameid/)
- Twitter: [@ahmedeid2684](https://twitter.com/ahmedeid2684)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contribution"></a>

We're always looking to improve this project! 🔍 If you notice any issues or have ideas for new features, please don't hesitate to submit a [pull request](https://github.com/ahmedeid6842/music-store/pulls) 🙌 or create a [new issue](https://github.com/ahmedeid6842/music-store/issues/new) 💡. Your contribution will help make this project even better! ❤️ 💪

## 👀 Kanban Board <a name="kanban-board"></a>
You can check my kanban board from [Here](https://github.com/users/ahmedeid6842/projects/4) to see how I split this project into tasks and mange them.

<img src="https://github.com/ahmedeid6842/search-engine/assets/57197702/2280f06c-1cfa-447c-819e-cfa0deac6711" align="center" alt="kanban board image"/>

## ⭐️ Show your support <a name="support"></a>

If you find this project helpful, I would greatly appreciate it if you could leave a star! 🌟 💟 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Up next <a name="up-next"></a>

- [ ] Implement Search engine for different songs searches 
- [ ] Enhance the DataBase queries time by using redis LRU caching
- [ ] Move from monolithic to microservices architecture.
- [ ] Apply Background jobs and task scheduling Use a job queue system like Bull or Agenda to handle time-consuming tasks.
- [ ] Support user media like image and upload songs.
- [ ] Deploy the REST API.
## 💎 Lessons Learned <a name="lessons-learned"></a> 

1. Secure user access with effective authentication and authorization.
2. Use a well-structured architecture, such as Nest.js, for code organization, scalability, and maintainability.
3. Take advantage of different NestJS components and decorators.
4. Manging the Many to Many relations
5. There is always something new to learn.

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I am deeply grateful to Alexapps for entrusting me with this project. The opportunity to implement this innovative concept has been an invaluable learning experience.

## 📜 License <a name="license"></a>

This project is licensed under the MIT License - you can click here to have more details [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center">
  <img src="https://github.com/ahmedeid6842/music-store/assets/57197702/fd57dae3-2f61-44a8-bc7f-cfc9a283af80"/>
</div>
