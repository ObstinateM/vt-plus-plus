/**
 * @const boolean Allow user to use code
 * CODE can be used as student / group unique id to query specific calendar
 */
const ALLOW_CODE_SELECTION = true

/**
 * @const string URL of the ICAL file
 * If ALLOW_CODE_SELECTION is true {{CODE}} will be replaced by the code the user has entered
 * !! Do not use {{CODE}} if ALLOW_CODE_SELECTION is false because it will result as undefined !!
 */
const ICAL_URL = "https://domain.com/icals/{{CODE}}.ics";

/**
 * @const bool show saturday on calendar view
 */
const SHOW_SATURDAY = true; 

/**
 * @const bool show organizer name on each cell
 */
const SHOW_ORGANIZER = false;

const config = {
    useCode: ALLOW_CODE_SELECTION,
    ical: ICAL_URL,
    saturday: SHOW_SATURDAY,
    organizer: SHOW_ORGANIZER
}


export default config;