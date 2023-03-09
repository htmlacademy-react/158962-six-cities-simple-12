import { Link } from 'react-router-dom';

type LogoProps = {
  type: 'header' | 'footer';
}

const sizes = {
  header: {
    height: 41,
    width: 81,
  },
  footer: {
    height: 33,
    width: 64,
  }
};

const Logo = ({ type }: LogoProps): JSX.Element => {
  const size = sizes[type];

  return (
    <Link className={`${type}__logo-link`}
      to={'/'}
    >
      <img className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={size.width}
        height={size.height}
      />
    </Link>
  );
};

export default Logo;
