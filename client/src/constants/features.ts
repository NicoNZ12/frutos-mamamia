import SpaIcon from '@mui/icons-material/Spa';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface IFeature{
    id: number,
    icon: React.ComponentType,
    title: string,
    description: string
}
export const features: IFeature[] = [
  {
    id: 1,
    icon: SpaIcon,
    title: "100% Natural",
    description: "Sin aditivos ni conservantes artificiales",
  },
  {
    id: 2,
    icon: VerifiedUserIcon,
    title: "Calidad Premium",
    description: "Selección cuidadosa de los mejores productos",
  },
  {
    id: 3,
    icon: LocalShippingIcon,
    title: "Envío Rápido",
    description: "Entrega en 24-48 horas",
  },
]

// Algunos porductos de la seccion de nosotros
interface IProducts{
    id: number
    icon: string,
    title: string,
    description: string
}
export const products: IProducts[] = [
  {
    id: 1,
    icon: "🥜",
    title: "Frutos Secos",
    description: "Nueces, almendras, avellanas y más, seleccionados por su frescura y sabor.",
  },
  {
    id: 2,
    icon: "🍇",
    title: "Deshidratados",
    description: "Arándanos, banana chips, naranja glaseada, perfectos para tu energía diaria.",
  },
  {
    id: 3,
    icon: "🌱",
    title: "Cereales y Semillas",
    description: "Semillas de girasol, amapola, chía y otros superalimentos naturales.",
  },
]