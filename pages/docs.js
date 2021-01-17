import { RedocStandalone } from 'redoc'

let Spec = require('../docs/openapi.yaml')

export default function Docs() {
    return(<RedocStandalone spec={Spec} />)
}