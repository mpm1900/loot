export const calculateArmorDamage = (rawDamage: number, armor: number) => {
    if (rawDamage > armor) {
        return armor
    } else {
        return rawDamage
    }
}