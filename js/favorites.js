export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.profiles = [
      {
        login: 'piluvitu',
        name: 'Paulo Victor',
        public_repos: '20',
        followers: '50'
      },
      {
        login: 'diego3g',
        name: 'Diego Fernandes',
        public_repos: '50',
        followers: '500000'
      }
    ]
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
  }

  update() {
    this.removeAllTr()
    this.createRowForEachUser()
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
    <img
      src=""
      alt=""
    />
    <a class="id" href="https://www.github.com/diego3g">
      <p>Diego Fernandes</p>
      <span>diego3g</span>
    </a>
  </td>
  <td class="repositories">300</td>
  <td class="followers">70000</td>
  <td><button class="remove">&times;</button></td>
  `

    return tr
  }

  createRowForEachUser() {
    this.profiles.forEach(profile => {
      const row = this.createRow()

      row.querySelector(
        '.user img'
      ).src = `https://www.github.com/${profile.login}.png`
      row.querySelector(
        '.user img'
      ).alt = `Github ${profile.name.toLocaleLowerCase()} profile picture`
      row.querySelector(
        '.user a'
      ).href = `https://www.github.com/${profile.login}`
      row.querySelector('.user a p').innerText = `${profile.name}`
      row.querySelector('.user a span').innerText = `${profile.login}`
      row.querySelector('.repositories').innerText = `${profile.public_repos}`
      row.querySelector('.followers').innerText = `${profile.followers}`

      this.tbody.append(row)
    })
  }
}
