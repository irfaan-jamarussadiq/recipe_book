function NavBar({ links, linkTexts }) {
  return (
    <nav className="NavBar">
      <h1>Irfaan's Recipe Collection</h1>
      <ul className="recipe-links">
        {links.map((link, index) => (
          <li key={index} className="recipe-link">
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
