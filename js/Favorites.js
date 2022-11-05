import { GitHubUser } from './GitHubUser.js'

//Classe que lida com os dados da api e outra que trata esses dados e exibe em tela

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.profiles = JSON.parse(localStorage.getItem('@github_favorites:')) || []
  }
  save() {
    localStorage.setItem('@github_favorites:', JSON.stringify(this.profiles))
  }

  async add(value) {
    try {
      const userExists = this.profiles.find(profile => profile.login === value)

      if (userExists) {
        throw new Error('Usuário já existe!')
      }

      const user = await GitHubUser.search(value)

      if (user.login === undefined) {
        throw new Error('Esse usuário não existe!')
      }

      this.profiles = [user, ...this.profiles]
      this.save()
      this.update()
    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredProfiles = this.profiles.filter(profile => {
      return profile.login !== user.login
    })

    this.profiles = filteredProfiles

    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.onAdd()
    this.update()
  }

  update() {
    this.removeAllTrs()
    this.createAndDeleteTrForEachProfile()
  }

  removeAllTrs() {
    const trs = this.tbody.querySelectorAll('tr')
    trs.forEach(tr => tr.remove())
  }

  createTr() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
          <img
          src="https://www.github.com/nickName.png"
          alt="Imagem perfil Name do GitHub"
        />
        <a class="id" href="https://www.github.com/nickName">
          <p>Name</p>
          <span>nickName</span>
        </a>
      </td>
      <td class="repositories">null</td>
      <td class="followers">null</td>
      <td><button class="remove">&times;</button></td>
    `

    return tr
  }

  createAndDeleteTrForEachProfile() {
    this.profiles.forEach(profile => {
      const row = this.createTr()

      //Criar Row para cada item no array
      row.querySelector(
        '.user img'
      ).src = `https://www.github.com/${profile.login}.png`
      row.querySelector(
        '.user img'
      ).alt = `Imagem de perfil do github de ${profile.name.toLocaleLowerCase()}`
      row.querySelector(
        '.user a'
      ).href = `https://www.github.com/${profile.login}`
      row.querySelector('.user a p').innerText = `${profile.name}`
      row.querySelector('.user a span').innerText = `${profile.login}`
      row.querySelector('.repositories').innerText = `${profile.public_repos}`
      row.querySelector('.followers').innerText = `${profile.followers}`

      //Deletar uma Linha

      row.querySelector('.remove').onclick = () => {
        const itsOk = confirm('Você realmente quer excluir esse perfil ?')

        if (itsOk) {
          this.delete(profile)
        }
      }

      //Exibir na tela cada elemento
      this.tbody.append(row)
    })
  }

  onAdd() {
    const addButton = this.root.querySelector('.search button')

    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  }
}
