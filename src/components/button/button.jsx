import './button.scss';

export function Button({label}) {
  return <button className="super-button">{label}</button>;
}

export function logoutButton() {
  return <Button variant="Dark"
}
