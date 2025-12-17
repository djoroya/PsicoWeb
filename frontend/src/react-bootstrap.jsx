import React from 'react';

const combine = (...classes) => classes.filter(Boolean).join(' ');

export const Container = ({ children, className = '', ...props }) => (
  <div className={combine('container', className)} {...props}>
    {children}
  </div>
);

export const Row = ({ children, className = '', ...props }) => (
  <div className={combine('row', className)} {...props}>
    {children}
  </div>
);

export const Col = ({ children, md = 12, className = '', ...props }) => (
  <div className={combine(`col-md-${md}`, className)} {...props}>
    {children}
  </div>
);

export const Card = ({ children, className = '', ...props }) => (
  <div className={combine('card h-100', className)} {...props}>
    {children}
  </div>
);
Card.Body = ({ children, className = '', ...props }) => (
  <div className={combine('card-body', className)} {...props}>
    {children}
  </div>
);
Card.Title = ({ children, className = '', ...props }) => (
  <h5 className={combine('card-title', className)} {...props}>
    {children}
  </h5>
);
Card.Text = ({ children, className = '', ...props }) => (
  <p className={combine('card-text', className)} {...props}>
    {children}
  </p>
);
Card.Img = ({ variant = 'top', className = '', ...props }) => (
  <img className={combine(variant === 'top' ? 'card-img-top' : 'card-img-bottom', className)} {...props} />
);

export const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
  const classes = combine('btn', `btn-${variant}`, className);
  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export const Navbar = ({ children, bg = 'light', variant = 'light', className = '', ...props }) => (
  <nav className={combine(`navbar navbar-${variant} bg-${bg}`, className)} {...props}>
    <div className="container">{children}</div>
  </nav>
);
Navbar.Brand = ({ children, as: Component = 'a', className = '', ...props }) => (
  <Component className={combine('navbar-brand', className)} {...props}>
    {children}
  </Component>
);
Navbar.Toggle = (props) => <button className="navbar-toggler" {...props}>☰</button>;
Navbar.Collapse = ({ children, className = '', ...props }) => (
  <div className={combine('navbar-collapse', className)} {...props}>
    {children}
  </div>
);

export const Nav = ({ children, className = '', ...props }) => (
  <div className={combine('navbar-nav', className)} {...props}>
    {children}
  </div>
);
Nav.Link = ({ children, as: Component = 'a', className = '', ...props }) => (
  <Component className={combine('nav-link', className)} {...props}>
    {children}
  </Component>
);

export const Form = ({ children, className = '', ...props }) => (
  <form className={className} {...props}>
    {children}
  </form>
);
Form.Group = ({ children, className = '', ...props }) => (
  <div className={combine('mb-3', className)} {...props}>
    {children}
  </div>
);
Form.Label = ({ children, className = '', ...props }) => (
  <label className={className} {...props}>
    {children}
  </label>
);
Form.Control = ({ as: Component = 'input', className = '', ...props }) => (
  <Component className={combine('form-control', className)} {...props} />
);
Form.Check = ({ label, className = '', ...props }) => (
  <div className={combine('form-check', className)}>
    <input className="form-check-input" type="checkbox" {...props} />
    <label className="form-check-label">{label}</label>
  </div>
);

export const Table = ({ children, className = '', ...props }) => (
  <table className={combine('table table-striped table-bordered', className)} {...props}>
    {children}
  </table>
);

export const Alert = ({ children, variant = 'info', className = '', ...props }) => (
  <div className={combine(`alert alert-${variant}`, className)} role="alert" {...props}>
    {children}
  </div>
);

export const Spinner = ({ animation }) => <div className="spinner-border" role="status" aria-label={animation || 'loading'} />;

export const ListGroup = ({ children, className = '', ...props }) => (
  <ul className={combine('list-group', className)} {...props}>
    {children}
  </ul>
);
ListGroup.Item = ({ children, className = '', ...props }) => (
  <li className={combine('list-group-item', className)} {...props}>
    {children}
  </li>
);
