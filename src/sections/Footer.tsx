import styles from "./Footer.module.scss";

const links = [
  {
    id: 0,
    name: "Github",
    href: "https://github.com/joseignacioLS",
    icon: `${import.meta.env.BASE_URL}github.svg`,
  },
  {
    id: 1,
    name: "Linkedin",
    href: "https://www.linkedin.com/in/ls-joseignacio/",
    icon: `${import.meta.env.BASE_URL}linkedin.svg`,
  },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.socialNetworkList}>
        {links.map(({ id, name, href, icon }) => {
          return (
            <a key={id} href={href} target="_blank" rel="noopener noreferrer">
              <li className={styles.socialNetworkItem}>
                <img src={icon} className={styles.icon}></img>
                <span className={styles.name}>{name}</span>
              </li>
            </a>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
