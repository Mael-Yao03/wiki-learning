# My Rotten Tomatoes

## Overview

"My Rotten Tomatoes" is a film presentation and review website developed with Next.js and MongoDB. The platform allows users to browse movies, rate them, leave comments, and manage a favorites list. Additionally, it includes an admin section where administrators can manage the movie database and user accounts. Movie information is fetched using The Movie Database (TMDb) API.

## Installation

### Prerequisites

- Node.js
- MongoDB
- TMDb API Key

### Cloning the Repository

1. Clone the repository:


    git clone git@github.com:EpitechCodingAcademyPromo2024/C-COD-270-ABJ-2-1-c2cod270p0-danielle.domoraud.git
    cd rotten_tomatoes
    

### Backend Installation

1. Navigate to the backend directory:


    cd backend


2. Install the dependencies:

    
    npm install
    

3. Configure environment variables by creating a `.env` file:

    
    TMDB_API_KEY=your_tmdb_api_key
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret


4. Start the development server:

    
    npm run start:dev
    

### Frontend Installation

1. Navigate to the frontend directory:

    
    cd frontend
    

2. Install the dependencies:

    
    npm install
    

3. Start the development server:

    
    npm run dev
    

## Usage

### User Functionalities

- **Browsing Movies:** Users can view a list of movies with detailed information including title, description, ratings, and reviews.
- **Authentication:** Users can register and log in to access personalized features.
- **Favorite List:** Users can add movies to their favorite list for easy access.
- **Rating Movies:** Users can rate movies on a scale of 1 to 5 stars.
- **Commenting:** Users can write and view comments on each movie.
- **Filtering:** Users can filter movies by genre, release date, or director.

### Admin Functionalities

- **User Management:** Admins can create, update, and delete user accounts, as well as promote users to administrators.
- **Movie Management:** Admins can add, update, and delete movies in the database using data from The Movie Database API.
- **Statistics:** Admins can view detailed statistics on movie ratings and user interactions.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TMDb API Documentation](https://developers.themoviedb.org/3/getting-started/introduction)