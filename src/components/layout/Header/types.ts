export interface NavItem {
  key: string;
  href: string;
}

export interface HeaderState {
  isMenuOpen: boolean;
  isAdmin: boolean;
  isScrolled: boolean;
}

export interface AnimationVariants {
  headerVariants: {
    initial: { y: number; opacity: number };
    animate: { y: number; opacity: number };
    exit: { y: number; opacity: number };
  };
  mobileMenuVariants: {
    initial: { opacity: number; height: number };
    animate: {
      opacity: number;
      height: string;
      transition: {
        duration: number;
        ease: string;
      };
    };
    exit: {
      opacity: number;
      height: number;
      transition: {
        duration: number;
        ease: string;
      };
    };
  };
  itemVariants: {
    initial: { opacity: number; x: number };
    animate: {
      opacity: number;
      x: number;
      transition: {
        duration: number;
      };
    };
  };
}
