import getCategories from './getCategories';

export const buildBreadcrumbMap = (): Record<string, string> => {
  const categories = getCategories();
  console.log(categories);
  return {
    '/catalog': 'Catalog',
    '/catalog/wearables': 'Wearables',
    '/catalog/wearables/smart-ar-gear': 'Smart AR Gear',
    '/catalog/wearables/biometric-accessories': 'Biometric Accessorie',
    '/catalog/transport': 'Transport',
    '/catalog/intelligence': 'Intelligence',
    '/catalog/intelligence/ai-assistants': 'AI Assistants',
    '/catalog/intelligence/predictive-tech': 'Predictive Tech',
    '/catalog/health': 'Nano-Medicine',
    '/catalog/immersive-tech': 'Immersive Tech',
    '/catalog/immersive-tech/holography': 'Holography',
    '/catalog/immersive-tech/gaming': 'Gaming',
    '/catalog/energy': 'Energy',
  };
};
