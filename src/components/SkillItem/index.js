import './index.css'

const SkillItem = props => {
  const {skillObj} = props
  const {name, imageUrl} = skillObj

  return (
    <li className="skill-item">
      <img className="skill-item-img" alt={name} src={imageUrl} />
      <p className="skill-item-name">{name}</p>
    </li>
  )
}

export default SkillItem
