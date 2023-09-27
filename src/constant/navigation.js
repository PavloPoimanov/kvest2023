// Define the navigation links with their "isActive" property
export const navigationLinks =(t, location = null)=> {
    return [
        {name: t('nav.names'), to: "/names", current: location?.pathname === "/names"},
        {name: t('nav.places'), to: "/places", current: location?.pathname === "/places"},
        {name: t('nav.numbers'), to: "/numbers", current: location?.pathname === "/numbers"},
        {name: t('nav.quotes'), to: "/quotes", current: location?.pathname === "/quotes"},
        {name: t('nav.text'), to: "/text", current: location?.pathname === "/text"}
    ];
};
