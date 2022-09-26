import { RedocStandalone } from 'redoc';

const Spec = require('../docs/openapi.yaml');

export default function Docs () {
  return (<RedocStandalone spec={Spec} />);
}
