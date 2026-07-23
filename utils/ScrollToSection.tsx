// utils/scrollToSection.ts
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return true;
  }
  return false;
};