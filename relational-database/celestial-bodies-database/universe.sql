--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: constellation; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.constellation (
    constellation_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    nasa_abbreviation character varying(15),
    brightest_star character varying(30),
    meaning character varying(30),
    genitive character varying(30)
);


ALTER TABLE public.constellation OWNER TO freecodecamp;

--
-- Name: constellations_constellation_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.constellations_constellation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.constellations_constellation_id_seq OWNER TO freecodecamp;

--
-- Name: constellations_constellation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.constellations_constellation_id_seq OWNED BY public.constellation.constellation_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(35) NOT NULL,
    description text,
    constellation character varying(30),
    galaxy_type text,
    declination text
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(35) NOT NULL,
    planet_id integer NOT NULL,
    description text,
    average_orbital_speed_in_km_s numeric(10,4),
    mean_temperature_in_kelvin numeric(5,1),
    discovery_year integer,
    mean_radius_in_km numeric(8,2)
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(35) NOT NULL,
    star_id integer NOT NULL,
    description text,
    has_life boolean,
    number_of_moons integer,
    mean_surface_temperature_in_kelvin numeric(8,2),
    mean_radius_in_km numeric(8,2),
    has_rings boolean,
    discovery_year integer,
    dwarf_planet boolean
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(35) NOT NULL,
    galaxy_id integer NOT NULL,
    description text,
    distance_from_sun_in_ly numeric(5,1),
    spectral_type character varying(30),
    luminance_in_watt numeric(30,1),
    temperature_in_kelvin numeric(30,1),
    bayer_designation character varying(30)
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: constellation constellation_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation ALTER COLUMN constellation_id SET DEFAULT nextval('public.constellations_constellation_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: constellation; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.constellation VALUES (1, 'Antlia', 'Antlia (/ˈæntliə/; from Ancient Greek ἀντλία) is a constellation in the Southern Celestial Hemisphere.', 'Antl', 'α Antliae', 'air pump', 'Antliae');
INSERT INTO public.constellation VALUES (2, 'Boötes', 'Boötes (/boʊˈoʊtiːz/ boh-OH-teez) is a constellation in the northern sky, located between 0° and +60° declination, and 13 and 16 hours of right ascension on the celestial sphere.', 'Boot', 'Arcturus', 'herdsman', 'Boötis');
INSERT INTO public.constellation VALUES (3, 'Cancer', 'Cancer is one of the twelve constellations of the zodiac and is located in the Northern celestial hemisphere.', 'Canc', 'Tarf', 'crab', 'Cancri');
INSERT INTO public.constellation VALUES (4, 'Gemini', 'Gemini is one of the constellations of the zodiac and is located in the northern celestial hemisphere.', 'Gemi', 'Pollux', 'twins', 'Geminorum');
INSERT INTO public.constellation VALUES (5, 'Leo', 'Leo /ˈliːoʊ/ is one of the constellations of the zodiac, between Cancer the crab to the west and Virgo the maiden to the east. ', 'Leo', 'Regulus', 'lion', 'Leonis');


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Andromeda Galaxy', 'The Andromeda Galaxy is a barred spiral galaxy and is the closest major galaxy to the Milky Way, where the Solar System resides. ', 'Andromeda', 'SA(s)b', '41° 16′ 9″');
INSERT INTO public.galaxy VALUES (2, 'Black Eye Galaxy', 'The Black Eye Galaxy (also called Sleeping Beauty Galaxy or Evil Eye Galaxy and designated Messier 64, M64, or NGC 4826) is a relatively isolated spiral galaxy 17 million light-years away in the mildly northern constellation of Coma Berenices.', 'Coma Berenices', '(R)SA(rs)ab', '21° 40′ 57.57″');
INSERT INTO public.galaxy VALUES (3, 'Backward Galaxy', 'NGC 4622 is a face-on unbarred spiral galaxy with a very prominent ring structure located in the constellation Centaurus.', 'Centaurus', 'SA(r)ab', '−40° 44′ 35″');
INSERT INTO public.galaxy VALUES (4, 'Bode''s Galaxy', 'Messier 81 (also known as NGC 3031 or Bode''s Galaxy) is a grand design spiral galaxy about 12 million light-years away in the constellation Ursa Major. ', 'Ursa Major', 'SA(s)ab', '69° 3′ 55″');
INSERT INTO public.galaxy VALUES (5, 'Milky Way', 'The Milky Way is the galaxy that includes the Solar System, with the name describing the galaxy''s appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye.', 'Sagittarius', 'Sb; Sbc; SB(rs)bc', '−29° 00′ 28.1699″');
INSERT INTO public.galaxy VALUES (6, 'Cartwheel Galaxy', 'The Cartwheel Galaxy (also known as ESO 350-40 or PGC 2248) is a lenticular ring galaxy about 500 million light-years away in the constellation Sculptor.', 'Sculptor', 'S pec (Ring)', '−33° 42′ 59″');
INSERT INTO public.galaxy VALUES (7, 'Cigar Galaxy', 'Messier 82 (also known as NGC 3034, Cigar Galaxy or M82) is a starburst galaxy approximately 12 million light-years away in the constellation Ursa Major.', 'Ursa Major', 'I0', '69° 40′ 47″');
INSERT INTO public.galaxy VALUES (8, 'Circinus Galaxy', 'The Circinus Galaxy (ESO 97-G13) is a Seyfert galaxy in the constellation of Circinus.', 'Circinus', 'SA(s)b', '−65° 20′ 21″');
INSERT INTO public.galaxy VALUES (9, 'Coma Pinwheel Galaxy', 'Messier 99 or M99, also known as NGC 4254, is a grand design spiral galaxy in the northern constellation Coma Berenices approximately 15,000,000 parsecs (49,000,000 light-years) from the Milky Way.', 'Coma Berenices', 'SA(s)c', '14° 24′ 59.36″');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 3, 'The Moon is Earth''s only natural satellite. Its diameter is about one-quarter of Earth''s (comparable to the width of Australia) ', 1.0220, NULL, NULL, 1737.40);
INSERT INTO public.moon VALUES (2, 'Phobos', 4, 'Phobos (/ˈfoʊbɒs/; systematic designation: Mars I) is the innermost and larger of the two natural satellites of Mars, the other being Deimos.', 2.1380, 233.0, 1877, 11.27);
INSERT INTO public.moon VALUES (3, 'Deimos', 4, 'Deimos /ˈdaɪməs/ (systematic designation: Mars II) is the smaller and outermost of the two natural satellites of Mars, the other being Phobos.', 1.3513, 233.0, 1877, 6.20);
INSERT INTO public.moon VALUES (4, 'Ganymede', 5, 'Ganymede, or Jupiter III, is the largest and most massive natural satellite of Jupiter as well as in the Solar System, being a planetary-mass moon.', 10.8800, NULL, 1610, 2634.00);
INSERT INTO public.moon VALUES (5, 'Callisto', 5, 'Callisto (/kəˈlɪstoʊ/), or Jupiter IV, is the second-largest moon of Jupiter, after Ganymede. ', 152.0000, 134.0, 1610, 2410.30);
INSERT INTO public.moon VALUES (6, 'Io', 5, 'Io (/ˈaɪ.oʊ/), or Jupiter I, is the innermost and third-largest of the four Galilean moons of the planet Jupiter.', 17.3340, 110.0, 1610, 1821.60);
INSERT INTO public.moon VALUES (7, 'Europa', 5, 'Europa /jʊˈroʊpə/ , or Jupiter II, is the smallest of the four Galilean moons orbiting Jupiter, and the sixth-closest to the planet of all the 95 known moons of Jupiter.', 13.7434, 102.0, 1610, 1560.80);
INSERT INTO public.moon VALUES (8, 'Titan', 6, 'Titan is the largest moon of Saturn, the second-largest in the Solar System and larger than any of the dwarf planets of the Solar System.', 5.5700, 93.7, 1655, 2574.73);
INSERT INTO public.moon VALUES (9, 'Rhea', 6, 'Rhea (/ˈriː.ə/) is the second-largest moon of Saturn and the ninth-largest moon in the Solar System, with a surface area that is compareable to the area of Australia.', 8.4800, NULL, 1672, 763.50);
INSERT INTO public.moon VALUES (10, 'Iapetus', 6, 'Iapetus (/aɪˈæpətəs/) is a moon of Saturn. With an estimated diameter of 1,469 km, it is the third-largest moon of Saturn and the eleventh-largest in the Solar System.', 3.2600, NULL, 1671, 734.40);
INSERT INTO public.moon VALUES (11, 'Dione', 6, 'Dione (/daɪˈoʊni/), also designated Saturn IV, is the fourth-largest moon of Saturn.', NULL, 87.0, 1684, 561.40);
INSERT INTO public.moon VALUES (12, 'Tethys', 6, 'Tethys (/ˈtiːθɪs, ˈtɛθɪs/), or Saturn III, is a mid-sized moon of Saturn about 1,060 km (660 mi) across.', 11.3500, 86.0, 1684, 531.10);
INSERT INTO public.moon VALUES (13, 'Enceladus', 6, 'Enceladus is the sixth-largest moon of Saturn (19th largest in the Solar System). It is about 500 kilometers (310 miles) in diameter, about a tenth of that of Saturn''s largest moon, Titan.', NULL, 75.0, 1789, 513.20);
INSERT INTO public.moon VALUES (14, 'Mimas', 6, 'Mimas, also designated Saturn I, is a natural satellite of Saturn that has the second largest crater on any moons in the Solar System, named the Herschel crater.', 14.2800, 64.0, 1789, 415.60);
INSERT INTO public.moon VALUES (15, 'Titania', 7, 'Titania (/təˈtɑːniə, təˈteɪniə/), also designated Uranus III, is the largest of the moons of Uranus and the eighth largest moon in the Solar System at a diameter of 1,578 kilometres (981 mi), with a surface area comparable to that of Australia.', 3.6400, 70.0, 1787, 788.40);
INSERT INTO public.moon VALUES (16, 'Oberon', 7, 'Oberon /ˈoʊbərɒn/, also designated Uranus IV, is the outermost major moon of the planet Uranus. It is the second-largest, with a surface area that is compareable to the area of Australia, and second most massive of the Uranian moons, and the ninth most massive moon in the Solar System.', 3.1500, 75.0, 1787, 761.40);
INSERT INTO public.moon VALUES (17, 'Umbriel', 7, 'Umbriel /ˈʌmbriəl/ is a moon of Uranus discovered on October 24, 1851, by William Lassell. It was discovered at the same time as Ariel and named after a character in Alexander Pope''s 1712 poem The Rape of the Lock.', 4.6700, 75.0, 1851, 584.70);
INSERT INTO public.moon VALUES (18, 'Ariel', 7, 'Ariel is the fourth-largest of the 27 known moons of Uranus. Ariel orbits and rotates in the equatorial plane of Uranus, which is almost perpendicular to the orbit of Uranus and so has an extreme seasonal cycle.', 5.5100, 60.0, 1851, 578.90);
INSERT INTO public.moon VALUES (19, 'Miranda', 7, 'Miranda, also designated Uranus V, is the smallest and innermost of Uranus''s five round satellites.', 6.6600, 60.0, 1948, 235.80);
INSERT INTO public.moon VALUES (20, 'Triton', 8, 'Triton is the largest natural satellite of the planet Neptune, and was the first Neptunian moon to be discovered, on October 11, 1846, by English astronomer William Lassell.', 4.3900, 38.0, 1846, 1353.40);
INSERT INTO public.moon VALUES (21, 'Proteus', 8, 'Proteus (/ˈproʊtiəs/ PROH-tee-əs), also known as Neptune VIII, is the second-largest Neptunian moon, and Neptune''s largest inner satellite.', 7.6230, 51.0, 1989, 210.00);
INSERT INTO public.moon VALUES (22, 'Nereid', 8, 'Nereid, or Neptune II, is the third-largest moon of Neptune. It has the most eccentric orbit of all known moons in the Solar System. It was the second moon of Neptune to be discovered, by Gerard Kuiper in 1949.', NULL, 50.0, 1949, NULL);
INSERT INTO public.moon VALUES (23, 'Larissa', 8, 'Larissa, also known as Neptune VII, is the fifth-closest inner satellite of Neptune. It is named after Larissa, a lover of Poseidon (Neptune) in Greek mythology and eponymous nymph of the city in Thessaly, Greece.', NULL, 51.0, 1981, 97.00);
INSERT INTO public.moon VALUES (24, 'Galatea', 8, 'Galatea /ɡæləˈtiːə/, also known as Neptune VI, is the fourth-closest inner moon of Neptune. It is named after Galatea, one of the fifty Nereids of Greek legend, with whom Cyclops Polyphemus was vainly in love.', NULL, 51.0, 1989, 87.40);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 1, 'Mercury is the first planet from the Sun and the smallest planet in the Solar System.', false, 0, 340.00, 2440.53, false, NULL, false);
INSERT INTO public.planet VALUES (2, 'Venus', 1, 'Venus is the second planet from the Sun. It is a rocky planet with the densest atmosphere of all the rocky bodies in the Solar System, and the only one with a mass and size that is close to that of its orbital neighbour Earth.', false, 0, 730.00, 6051.80, false, NULL, false);
INSERT INTO public.planet VALUES (3, 'Earth', 1, 'Earth is the third planet from the Sun and the only place known in the universe where life has originated and found habitability.', true, 1, 287.00, 6378.14, false, NULL, false);
INSERT INTO public.planet VALUES (4, 'Mars', 1, 'Mars is the fourth planet and the furthest terrestrial planet from the Sun. The reddish color of its surface is due to finely grained iron(III) oxide dust in the soil, giving it the nickname "the Red Planet".', false, 2, 227.00, 3396.19, false, NULL, false);
INSERT INTO public.planet VALUES (5, 'Jupiter', 1, 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.', false, 95, 152.00, 71492.00, true, NULL, false);
INSERT INTO public.planet VALUES (6, 'Saturn', 1, 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.', false, 146, 134.00, 60268.00, true, NULL, false);
INSERT INTO public.planet VALUES (7, 'Uranus', 1, 'Uranus is the seventh planet from the Sun and is a gaseous cyan ice giant. Most of Uranus is made out of water, ammonia, and methane in a supercritical phase of matter, which in astronomy is called ''ice'' or volatiles.', false, 27, 76.00, 25559.00, true, 1781, false);
INSERT INTO public.planet VALUES (8, 'Neptune', 1, 'Neptune is the eighth planet from the Sun and the farthest known planet in the Solar System. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet, and the densest giant planet. ', false, 14, 73.00, 24764.00, true, 1846, false);
INSERT INTO public.planet VALUES (9, 'Ceres', 1, 'Ceres (pronounced /ˈsɪəriːz/,[20] SEER-eez), minor-planet designation 1 Ceres, is a dwarf planet in the asteroid belt between the orbits of Mars and Jupiter.', false, 0, 167.00, 473.00, false, 1801, true);
INSERT INTO public.planet VALUES (10, 'Pluto', 1, 'Pluto (minor-planet designation: 134340 Pluto) is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune.', false, 0, 40.00, 1188.30, false, 1930, true);
INSERT INTO public.planet VALUES (11, 'Haumea', 1, 'Haumea (minor-planet designation 136108 Haumea) is a dwarf planet located beyond Neptune''s orbit.', false, 0, 49.00, 816.00, true, 2004, true);
INSERT INTO public.planet VALUES (12, 'Makemake', 1, 'Makemake (minor-planet designation 136472 Makemake) is a dwarf planet and the second-largest of what are known as the classical population of Kuiper belt objects, with a diameter approximately that of Saturn''s moon Iapetus, or 60% that of Pluto.', false, 0, 30.00, 715.00, false, 2005, true);
INSERT INTO public.planet VALUES (13, 'Eris', 1, 'Eris (minor-planet designation 136199 Eris) is the most massive and second-largest known dwarf planet in the Solar System.', false, 0, 30.00, 1163.00, false, 2005, true);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (2, 'Sirius', 5, 'Sirius is the brightest star in the night sky. Its name is derived from the Greek word Σείριος, or Seirios, meaning lit. ''glowing'' or ''scorching''.', 8.6, 'A0mA1 Va, DA2', 25.4, 9940.0, 'α CMa');
INSERT INTO public.star VALUES (3, 'Canopus', 5, 'Canopus is the brightest star in the southern constellation of Carina and the second-brightest star in the night sky.', 310.0, 'A9 II', 10700.0, 7400.0, 'α Car');
INSERT INTO public.star VALUES (4, 'Rigil Kentaurus &amp; Toliman', 5, 'Alpha Centauri (α Centauri, Alpha Cen, or α Cen) is a triple star system in the southern constellation of Centaurus.', 4.3, 'G2 V, K1 V', 15059.0, 5790.0, 'α Cen');
INSERT INTO public.star VALUES (1, 'Sun', 5, 'The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core. ', 0.0, 'G2 V', 38280000000.0, 15700000.0, '');
INSERT INTO public.star VALUES (5, 'Arcturus', 5, 'Arcturus is the brightest star in the northern constellation of Boötes. With an apparent visual magnitude of −0.05, it is the fourth-brightest of the individual stars in the night sky, and the brightest in the northern celestial hemisphere.', 37.0, 'K0 III', 170.0, 4286.0, 'α Boo');
INSERT INTO public.star VALUES (6, 'Vega', 5, 'Vega is the brightest star in the northern constellation of Lyra. It has the Bayer designation α Lyrae, which is Latinised to Alpha Lyrae and abbreviated Alpha Lyr or α Lyr.', 25.0, 'A0 Va', 40.1, 9602.0, 'α Lyr');
INSERT INTO public.star VALUES (7, 'Capella', 5, 'Capella is the brightest star in the northern constellation of Auriga. It has the Bayer designation α Aurigae, which is Latinised to Alpha Aurigae and abbreviated Alpha Aur or α Aur.', 43.0, 'K0 III, G1 III', 78.7, 4970.0, 'α Aur');
INSERT INTO public.star VALUES (8, 'Rigel', 5, 'Rigel is a blue supergiant star in the constellation of Orion. It has the Bayer designation β Orionis, which is Latinized to Beta Orionis and abbreviated Beta Ori or β Ori.', 860.0, 'B8 la', 125000.0, 12100.0, 'β Ori');
INSERT INTO public.star VALUES (9, 'Procyon', 5, 'Procyon (/ˈproʊsi.ɒn/) is the brightest star in the constellation of Canis Minor and usually the eighth-brightest star in the night sky, with an apparent visual magnitude of 0.34.', 11.0, 'F5 IV-V', 6.9, 6530.0, 'α CMi');
INSERT INTO public.star VALUES (10, 'Achernar', 5, 'Achernar is the brightest star in the constellation of Eridanus, and the ninth-brightest in the night sky.', 139.0, 'B3 Vpe', 3493.0, -4451.0, 'α Eri');
INSERT INTO public.star VALUES (11, 'Betelgeuse', 5, 'Betelgeuse is a red supergiant star of spectral type M1-2 and one of the largest visible to the naked eye.', 550.0, 'M1-M2 Ia-ab', 126000.0, 3600.0, 'α Ori');
INSERT INTO public.star VALUES (12, 'Hadar', 5, 'Beta Centauri is a triple star system in the southern constellation of Centaurus. It is officially called Hadar (/ˈheɪdɑːr/).', 390.0, 'B1 III', 31600.0, 25000.0, 'β Cen');


--
-- Name: constellations_constellation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.constellations_constellation_id_seq', 5, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 9, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 24, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 13, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 12, true);


--
-- Name: constellation constellations_constellation_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation
    ADD CONSTRAINT constellations_constellation_id_key UNIQUE (constellation_id);


--
-- Name: constellation constellations_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation
    ADD CONSTRAINT constellations_pkey PRIMARY KEY (constellation_id);


--
-- Name: galaxy galaxy_galaxy_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_galaxy_id_key UNIQUE (galaxy_id);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_moon_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_moon_id_key UNIQUE (moon_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_planet_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_planet_id_key UNIQUE (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_star_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_star_id_key UNIQUE (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

