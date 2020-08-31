// Helper function to stringify the values of an Object
function toString(value) {
    if (value === null || typeof value === 'undefined') {
        return ''
    } else if (value instanceof Object) {
        return Object.keys(value)
            .sort()
            .map((key) => toString(value[key]))
            .join(' ')
    } else {
        return String(value)
    }
}

export default {
    sortHeroTable(aRow, bRow, key, sortDesc, formatter, compareOptions, compareLocale) {
        let a
        let b

        if (key === 'bra') {
            a = this.getAttack(aRow, 60, 6)
            b = this.getAttack(bRow, 60, 6)
        } else if (key === 'int') {
            a = this.getHealth(aRow, 60, 6)
            b = this.getHealth(bRow, 60, 6)
        } else if (key === 'fai') {
            a = this.getDefense(aRow, 60, 6)
            b = this.getDefense(bRow, 60, 6)
        } else if (key === 'des') {
            a = this.getSpeed(aRow)
            b = this.getSpeed(bRow)
        } else {
            // default case
            a = aRow[key]
            b = bRow[key]
        }

        if (typeof a === 'number' && typeof b === 'number') {
            // If both compared fields are native numbers or both are native dates
            return a < b ? -1 : a > b ? 1 : 0
        } else {
            // Otherwise stringify the field data and use String.prototype.localeCompare
            return toString(a).localeCompare(toString(b), compareLocale, compareOptions)
        }
    },

    getAttack({ role, zodiac, bra }, level, grade) {
        var temp = 0.6 * bra * (level / 6 + 1) * (1 + 0.075 * (grade - 1))
        var multi = 1
        if (role === 'knight') {
            if (zodiac === 'leo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.06
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'gemini') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
        }
        if (role === 'warrior') {
            if (zodiac === 'taurus') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        if (role === 'ranger') {
            if (zodiac === 'gemini') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        if (role === 'thief') {
            if (zodiac === 'aries') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'taurus') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'gemini') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'aries') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'gemini') {
                if (grade >= 3) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'cancer') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        if (role === 'soul weaver') {
            if (zodiac === 'libra') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        temp = temp * multi
        if (grade === 0) {
            return Math.floor(temp)
        } else if (grade === 1) {
            return Math.floor(temp + 20)
        } else if (grade === 2) {
            return Math.floor(temp + 40)
        } else if (grade === 3) {
            return Math.floor(temp + 60)
        } else if (grade === 4) {
            return Math.floor(temp + 90)
        } else if (grade === 5) {
            return Math.floor(temp + 120)
        } else if (grade === 6) {
            return Math.floor(temp + 150)
        } else {
            return Math.floor(temp + 150)
        }
    },
    getHealth({ role, zodiac, int }, level, grade) {
        var temp = (50 + 1.4 * int) * (level / 3 + 1) * (1 + 0.075 * (grade - 1))
        var multi = 1
        if (role === 'knight') {
            if (zodiac === 'aries') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'cancer') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.02
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'Pisces') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
        }
        if (role === 'warrior') {
            if (zodiac === 'aries') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'cancer') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        if (role === 'ranger') {
            if (zodiac === 'leo') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
        }
        if (role === 'thief') {
            if (zodiac === 'scorpio') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'aquarius') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
        }
        if (role === 'soul weaver') {
            if (zodiac === 'gemini') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'cancer') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'Pisces') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
        }
        temp = temp * multi
        if (grade === 0) {
            return Math.floor(temp)
        } else if (grade === 1) {
            return Math.floor(temp + 60)
        } else if (grade === 2) {
            return Math.floor(temp + 120)
        } else if (grade === 3) {
            return Math.floor(temp + 180)
        } else if (grade === 4) {
            return Math.floor(temp + 260)
        } else if (grade === 5) {
            return Math.floor(temp + 340)
        } else if (grade === 6) {
            return Math.floor(temp + 420)
        } else {
            return Math.floor(temp + 420)
        }
    },
    getDefense({ role, zodiac, fai }, level, grade) {
        var temp = (30 + 0.3 * fai) * (level / 8 + 1) * (1 + 0.075 * (grade - 1))
        var multi = 1
        if (role === 'knight') {
            if (zodiac === 'cancer') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'capricorn') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'pisces') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 4) {
                    multi += 0.06
                }
            }
        }
        if (role === 'warrior') {
            if (zodiac === 'aries') {
                if (grade >= 1) {
                    multi += 0.03
                }
                if (grade >= 5) {
                    multi += 0.06
                }
            }
            if (zodiac === 'cancer') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'capricorn') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
        }
        if (role === 'soul weaver') {
            if (zodiac === 'cancer') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 4) {
                    multi += 0.06
                }
            }
            if (zodiac === 'pisces') {
                if (grade >= 2) {
                    multi += 0.03
                }
                if (grade >= 6) {
                    multi += 0.06
                }
            }
        }
        temp = temp * multi
        return Math.floor(temp)
    },
    getSpeed({ role, zodiac, des }, level, grade) {
        var temp = 60 + des / 1.6
        var multi = 0
        if (role === 'knight') {
            if (zodiac === 'aries') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'gemini') {
                if (grade >= 1) {
                    multi += 2
                }
                if (grade >= 5) {
                    multi += 4
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 2) {
                    multi += 2
                }
                if (grade >= 6) {
                    multi += 4
                }
            }
        }
        if (role === 'warrior') {
            if (zodiac === 'aries') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 4) {
                    multi += 4
                }
            }
        }
        if (role === 'ranger') {
            if (zodiac === 'virgo') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 1) {
                    multi += 2
                }
                if (grade >= 2) {
                    multi += 2
                }
                if (grade >= 5) {
                    multi += 4
                }
                if (grade >= 6) {
                    multi += 4
                }
            }
            if (zodiac === 'capricorn') {
                if (grade >= 1) {
                    multi += 2
                }
                if (grade >= 5) {
                    multi += 4
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 4) {
                    multi += 4
                }
            }
        }
        if (role === 'thief') {
            if (zodiac === 'aries') {
                if (grade >= 2) {
                    multi += 2
                }
                if (grade >= 6) {
                    multi += 4
                }
            }
            if (zodiac === 'taurus') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 1) {
                    multi += 2
                }
                if (grade >= 5) {
                    multi += 4
                }
            }
            if (zodiac === 'Pices') {
                if (grade >= 4) {
                    multi += 4
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'taurus') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 1) {
                    multi += 4
                }
                if (grade >= 5) {
                    multi += 4
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 2) {
                    multi += 2
                }
                if (grade >= 6) {
                    multi += 4
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'Pices') {
                if (grade >= 2) {
                    multi += 2
                }
                if (grade >= 5) {
                    multi += 4
                }
            }
        }
        if (role === 'soul weaver') {
            if (zodiac === 'gemini') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 4) {
                    multi += 4
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 1) {
                    multi += 2
                }
                if (grade >= 5) {
                    multi += 4
                }
            }
        }
        temp = temp + multi
        return Math.floor(temp)
    },
    getCritChance({ role, zodiac }, grade) {
        var temp = 15
        if (role === 'knight') {
            if (zodiac === 'gemini') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 4) {
                    temp += 8
                }
            }
        }
        if (role === 'warrior') {
            if (zodiac === 'taurus') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
        }
        if (role === 'ranger') {
            if (zodiac === 'leo') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'libra') {
                if (grade >= 1) {
                    temp += 4
                }
                if (grade >= 5) {
                    temp += 8
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
        }
        if (role === 'thief') {
            if (zodiac === 'aries') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'gemini') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
            if (zodiac === 'leo') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'scorpio') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'pisces') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'aries') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
            if (zodiac === 'cancer') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 4) {
                    temp += 8
                }
            }
            if (zodiac === 'virgo') {
                if (grade >= 1) {
                    temp += 4
                }
                if (grade >= 5) {
                    temp += 8
                }
            }
            if (zodiac === 'sagittarius') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
            if (zodiac === 'pisces') {
                if (grade >= 2) {
                    temp += 4
                }
                if (grade >= 6) {
                    temp += 8
                }
            }
        }
        return temp
    },
    getCritDamage({ role, zodiac }, grade) {
        var temp = 150
        if (role === 'warrior') {
            if (zodiac === 'taurus') {
                if (grade >= 2) {
                    temp += 5
                }
                if (grade >= 6) {
                    temp += 10
                }
            }
        }
        if (role === 'ranger') {
            if (zodiac === 'libra') {
                if (grade >= 4) {
                    temp += 10
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'scorpio') {
                if (grade >= 4) {
                    temp += 10
                }
            }
        }
        return temp
    },
    getEffectiveness({ role, zodiac }, grade) {
        var temp = 0
        if (role === 'knight') {
            if (zodiac === 'aries') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        if (role === 'warrior') {
            if (zodiac === 'virgo') {
                if (grade >= 1) {
                    temp += 6
                }
                if (grade >= 5) {
                    temp += 12
                }
            }
        }
        if (role === 'ranger') {
            if (zodiac === 'gemini') {
                if (grade >= 1) {
                    temp += 6
                }
                if (grade >= 5) {
                    temp += 12
                }
            }
            if (zodiac === 'capricorn') {
                if (grade >= 1) {
                    temp += 6
                }
                if (grade >= 4) {
                    temp += 12
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        if (role === 'thief') {
            if (zodiac === 'gemini') {
                if (grade >= 4) {
                    temp += 12
                }
            }
            if (zodiac === 'pisces') {
                if (grade >= 1) {
                    temp += 6
                }
                if (grade >= 4) {
                    temp += 12
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'aries') {
                if (grade >= 1) {
                    temp += 6
                }
                if (grade >= 5) {
                    temp += 12
                }
            }
            if (zodiac === 'taurus') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 4) {
                    temp += 12
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        if (role === 'soul weaver') {
            if (zodiac === 'virgo') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        return temp
    },
    getResistance({ role, zodiac }, grade) {
        var temp = 0
        if (role === 'knight') {
            if (zodiac === 'libra') {
                if (grade >= 4) {
                    temp += 12
                }
            }
            if (zodiac === 'capricorn') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
            if (zodiac === 'pisces') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        if (role === 'mage') {
            if (zodiac === 'taurus') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 5) {
                    temp += 12
                }
            }
            if (zodiac === 'aquarius') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        if (role === 'soul weaver') {
            if (zodiac === 'gemini') {
                if (grade >= 2) {
                    temp += 6
                }
                if (grade >= 6) {
                    temp += 12
                }
            }
        }
        return temp
    },
    getDualAttack() {
        return 5
    }
}
