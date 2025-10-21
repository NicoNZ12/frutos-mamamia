import SpaIcon from '@mui/icons-material/Spa';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface IFeature{
    icon: React.ComponentType,
    title: string,
    description: string
}
export const features: IFeature[] = [
  {
    icon: SpaIcon,
    title: "100% Natural",
    description: "Sin aditivos ni conservantes artificiales",
  },
  {
    icon: VerifiedUserIcon,
    title: "Calidad Premium",
    description: "Selección cuidadosa de los mejores productos",
  },
  {
    icon: LocalShippingIcon,
    title: "Envío Rápido",
    description: "Entrega en 24-48 horas",
  },
]

// Algunos porductos de la seccion de nosotros
interface IProducts{
    icon: string,
    title: string,
    description: string
}
export const products: IProducts[] = [
  {
    icon: "🥜",
    title: "Frutos Secos",
    description: "Nueces, almendras, avellanas y más, seleccionados por su frescura y sabor.",
  },
  {
    icon: "🍇",
    title: "Deshidratados",
    description: "Arándanos, banana chips, naranja glaseada, perfectos para tu energía diaria.",
  },
  {
    icon: "🌱",
    title: "Cereales y Semillas",
    description: "Semillas de girasol, amapola, chía y otros superalimentos naturales.",
  },
]