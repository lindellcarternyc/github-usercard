/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

import axios from 'axios'

const createTextElement = (tagName, text, className) => {
  const tag = document.createElement(tagName)
  if (className) {
    tag.className = className
  }
  tag.textContent = text
  return tag
}

const makeUserCard = ({ avatar_url, html_url, location, login, name, followers, following, bio }) => {
  const card = document.createElement('div')
  card.className = 'card'

  const avatar = document.createElement('img')
  avatar.setAttribute('src', avatar_url)
  card.appendChild(avatar)

  const cardInfo = document.createElement('div')
  cardInfo.className = 'card-info'

  cardInfo.appendChild(createTextElement('h3', name || login, name))
  cardInfo.appendChild(createTextElement('p', login, 'username'))
  cardInfo.appendChild(createTextElement('p', `Location: ${location}`))

  const profile = createTextElement ('p', 'Profile: ')
  const profileLink = document.createElement('a')
  profileLink.textContent = html_url
  profileLink.setAttribute('href', html_url)
  profile.appendChild(profileLink)
  cardInfo.appendChild(profile)

  cardInfo.appendChild(createTextElement('p', `Followers: ${followers}`))
  cardInfo.appendChild(createTextElement('p', `Following: ${following}`))
  cardInfo.appendChild(createTextElement('p', `Bio: ${bio || ''}`))

  card.appendChild(cardInfo)
  return card
}

axios.get('https://api.github.com/users/lindellcarternyc')
  .then(res => {
    const userCard = makeUserCard(res.data)
    document.querySelector('.cards').appendChild(userCard)
  })
  .catch(err => {
    console.log(`Error: ${err}`)
  })