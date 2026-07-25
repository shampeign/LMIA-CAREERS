export interface EmployerLocation {
  city: string;
  province: string;
}

export interface HiringRecord {
  position: string;
  location: string;
  year: number;
  status: string;
}

export interface OpenPosition {
  title: string;
  location: string;
  type: string;
  salary: string;
}

export interface Employer {
  slug: string;
  name: string;
  industry: string;
  province: string;
  city: string;
  website: string;
  careerPage: string;
  description: string;
  aiSummary: string;
  employeeCount: string;
  founded: string;
  locations: EmployerLocation[];
  hiringHistory: HiringRecord[];
  openPositions: OpenPosition[];
}

export const employers: Employer[] = [
  {
    slug: "maple-leaf-foods",
    name: "Maple Leaf Foods",
    industry: "Food Processing",
    province: "Ontario",
    city: "Mississauga",
    website: "https://www.mapleleaffoods.com",
    careerPage: "https://www.mapleleaffoods.com/careers/",
    description:
      "One of Canada's leading consumer protein companies, producing meat and plant-based products in facilities across Ontario, Manitoba, and Saskatchewan.",
    aiSummary:
      "Maple Leaf Foods is a major Canadian food processing company headquartered in Mississauga, Ontario, with a rich history dating back to 1927. The company operates a network of processing facilities across Ontario, Manitoba, and Saskatchewan, employing over 10,000 people. As one of Canada's largest protein companies, Maple Leaf Foods produces a wide range of meat products including fresh and prepared meats, poultry, and plant-based alternatives under well-known brands such as Maple Leaf, Schneiders, and Lightlife.\n\nThe company has publicly documented use of the Temporary Foreign Worker Program (TFWP) to fill roles in its meat processing facilities, particularly for positions requiring specialized skills in food safety and production. TFWP hiring has been concentrated in facilities located in Brandon, Manitoba; Saskatoon, Saskatchewan; and various Ontario locations. Maple Leaf has also invested significantly in sustainability initiatives, aiming to become the most sustainable protein company on earth, which has created additional demand for skilled workers in environmental management and engineering roles.",
    employeeCount: "10,000+",
    founded: "1927",
    locations: [
      { city: "Mississauga", province: "Ontario" },
      { city: "Brandon", province: "Manitoba" },
      { city: "Saskatoon", province: "Saskatchewan" },
      { city: "Brampton", province: "Ontario" },
      { city: "Walker Road, Windsor", province: "Ontario" },
    ],
    hiringHistory: [
      {
        position: "Meat Processing Worker",
        location: "Brandon, MB",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Food Safety Technician",
        location: "Saskatoon, SK",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Production Supervisor",
        location: "Mississauga, ON",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Quality Assurance Specialist",
        location: "Brampton, ON",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Industrial Electrician",
        location: "Brandon, MB",
        type: "Full-time",
        salary: "$68,000–$85,000",
      },
      {
        title: "Food Safety & QA Technician",
        location: "Saskatoon, SK",
        type: "Full-time",
        salary: "$52,000–$65,000",
      },
      {
        title: "Production Line Operator",
        location: "Mississauga, ON",
        type: "Full-time",
        salary: "$44,000–$56,000",
      },
    ],
  },
  {
    slug: "suncor-energy",
    name: "Suncor Energy",
    industry: "Oil & Gas",
    province: "Alberta",
    city: "Calgary",
    website: "https://www.suncor.com",
    careerPage: "https://www.suncor.com/en-ca/careers",
    description:
      "Canada's leading integrated energy company, operating in oil sands development, offshore production, and renewable energy with major operations in Fort McMurray.",
    aiSummary:
      "Suncor Energy is a Calgary-based integrated energy company and one of Canada's largest corporations by market capitalization. Founded in 1919 and originally known as Sun Company of Canada, Suncor pioneered oil sands development in Alberta and remains a dominant player in the sector with its massive operations near Fort McMurray. The company also operates refineries in Alberta, Ontario, and Quebec, along with a network of Petro-Canada retail stations across the country.\n\nSuncor has utilized the Temporary Foreign Worker Program to address skilled labor shortages in its Fort McMurray operations, particularly for engineering, trades, and technical roles related to oil sands extraction and upgrading. The company's hiring through TFWP has typically targeted specialized occupations such as heavy equipment operators, process engineers, and instrumentation technicians. Suncor's evolving focus on energy transition and lower-emissions operations has more recently created demand for professionals in environmental engineering and carbon capture technology, though TFWP usage has been concentrated in its traditional oil sands operations.",
    employeeCount: "16,000+",
    founded: "1919",
    locations: [
      { city: "Calgary", province: "Alberta" },
      { city: "Fort McMurray", province: "Alberta" },
      { city: "Edmonton", province: "Alberta" },
      { city: "Sarnia", province: "Ontario" },
      { city: "Montreal", province: "Quebec" },
    ],
    hiringHistory: [
      {
        position: "Process Engineer",
        location: "Fort McMurray, AB",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Heavy Equipment Operator",
        location: "Fort McMurray, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Instrumentation Technician",
        location: "Fort McMurray, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Maintenance Planner",
        location: "Edmonton, AB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Senior Process Engineer",
        location: "Fort McMurray, AB",
        type: "Full-time",
        salary: "$110,000–$145,000",
      },
      {
        title: "Heavy Equipment Technician",
        location: "Fort McMurray, AB",
        type: "Full-time",
        salary: "$80,000–$105,000",
      },
      {
        title: "Environmental Specialist",
        location: "Calgary, AB",
        type: "Full-time",
        salary: "$85,000–$110,000",
      },
    ],
  },
  {
    slug: "shopify-inc",
    name: "Shopify Inc.",
    industry: "Technology",
    province: "Ontario",
    city: "Ottawa",
    website: "https://www.shopify.com",
    careerPage: "https://www.shopify.com/careers",
    description:
      "Global commerce platform powering millions of businesses worldwide, headquartered in Ottawa with a growing team across software engineering, product, and operations.",
    aiSummary:
      "Shopify Inc. is a Canadian multinational e-commerce company headquartered in Ottawa, Ontario. Founded in 2006 by Tobias Lütke, Daniel Weinand, and Scott Lake, Shopify has grown from a small startup into one of the world's leading commerce platforms, serving millions of merchants in over 175 countries. The company's platform enables businesses of all sizes to create online stores, manage inventory, process payments, and handle shipping, making it an essential tool in the modern digital economy.\n\nWhile Shopify's core hiring is concentrated in software engineering, data science, product management, and design roles primarily in Ottawa and Toronto, the company has also made use of the Temporary Foreign Worker Program for specialized technical positions where domestic talent pools have been insufficient. TFWP-related hiring has focused on senior engineering roles, machine learning specialists, and certain niche technical positions. Shopify has also expanded into international markets and maintains offices in several countries, though its TFWP usage is documented primarily for its Canadian operations.",
    employeeCount: "8,300+",
    founded: "2006",
    locations: [
      { city: "Ottawa", province: "Ontario" },
      { city: "Toronto", province: "Ontario" },
      { city: "Montreal", province: "Quebec" },
      { city: "Vancouver", province: "British Columbia" },
    ],
    hiringHistory: [
      {
        position: "Senior Software Engineer",
        location: "Ottawa, ON",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Machine Learning Engineer",
        location: "Toronto, ON",
        year: 2024,
        status: "Approved",
      },
      {
        position: "DevOps Specialist",
        location: "Ottawa, ON",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Staff Software Engineer",
        location: "Ottawa, ON",
        type: "Full-time",
        salary: "$140,000–$190,000",
      },
      {
        title: "Product Designer",
        location: "Toronto, ON",
        type: "Full-time",
        salary: "$95,000–$130,000",
      },
      {
        title: "Data Scientist",
        location: "Remote, Canada",
        type: "Full-time",
        salary: "$110,000–$145,000",
      },
    ],
  },
  {
    slug: "ledcor-group",
    name: "Ledcor Group",
    industry: "Construction",
    province: "Alberta",
    city: "Edmonton",
    website: "https://www.ledcor.com",
    careerPage: "https://www.ledcor.com/careers",
    description:
      "Diversified construction company with major infrastructure, building, and industrial projects across Western Canada and the United States.",
    aiSummary:
      "Ledcor Group is a privately held construction company founded in 1947 and headquartered in Edmonton, Alberta. The company has grown into one of North America's most diversified construction firms, with operations spanning building construction, civil infrastructure, industrial construction, mining, forestry, and telecommunications. Ledcor employs over 8,000 people and manages major projects across Canada and the United States, including highways, bridges, pipelines, high-rise buildings, and mining operations.\n\nLedcor has documented use of the Temporary Foreign Worker Program to fill skilled trades positions for large-scale infrastructure projects across Western Canada. The company's TFWP hiring has focused on trades such as carpenters, electricians, welders, and heavy equipment operators for projects in Alberta, British Columbia, and Saskatchewan. Ledcor's project-based workforce model means that labor needs can fluctuate significantly, and the TFWP has been one mechanism the company uses to address temporary skilled labor shortages during peak construction seasons.",
    employeeCount: "8,000+",
    founded: "1947",
    locations: [
      { city: "Edmonton", province: "Alberta" },
      { city: "Vancouver", province: "British Columbia" },
      { city: "Calgary", province: "Alberta" },
      { city: "Saskatoon", province: "Saskatchewan" },
      { city: "Kelowna", province: "British Columbia" },
    ],
    hiringHistory: [
      {
        position: "Journeyman Carpenter",
        location: "Vancouver, BC",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Structural Welder",
        location: "Calgary, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Heavy Equipment Operator",
        location: "Edmonton, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Construction Laborer",
        location: "Saskatoon, SK",
        year: 2023,
        status: "Completed",
      },
      {
        position: "Project Coordinator",
        location: "Edmonton, AB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Civil Project Manager",
        location: "Vancouver, BC",
        type: "Full-time",
        salary: "$100,000–$135,000",
      },
      {
        title: "Journeyman Electrician",
        location: "Calgary, AB",
        type: "Full-time",
        salary: "$75,000–$95,000",
      },
      {
        title: "Site Superintendent",
        location: "Edmonton, AB",
        type: "Full-time",
        salary: "$95,000–$125,000",
      },
    ],
  },
  {
    slug: "agropur-cooperative",
    name: "Agropur Cooperative",
    industry: "Agriculture",
    province: "Quebec",
    city: "Longueuil",
    website: "https://www.agropur.com",
    careerPage: "https://www.agropur.com/en/careers",
    description:
      "Major Canadian dairy cooperative with processing plants and distribution centers across the country, headquartered in Longueuil, Quebec.",
    aiSummary:
      "Agropur Cooperative is a Canadian dairy cooperative founded in 1938 and headquartered in Longueuil, Quebec. With over 3,000 dairy farmer members and more than 7,000 employees, Agropur is one of the largest dairy processors in North America. The cooperative operates 32 plants across Canada and the United States, producing a wide range of dairy products including fluid milk, cheese, butter, yogurt, and ice cream under brands such as Natrel, OKA, and Island Farms.\n\nAgropur has been a documented user of the Temporary Foreign Worker Program, particularly for positions in its processing facilities located in Quebec and other provinces. TFWP hiring has typically targeted production workers, equipment operators, and quality control technicians for its dairy processing plants. The cooperative's seasonal production cycles and the physical nature of dairy processing work have contributed to its use of the program to maintain consistent staffing levels across its facility network.",
    employeeCount: "7,000+",
    founded: "1938",
    locations: [
      { city: "Longueuil", province: "Quebec" },
      { city: "Granby", province: "Quebec" },
      { city: "Saint-Hyacinthe", province: "Quebec" },
      { city: "Don Mills", province: "Ontario" },
      { city: "Winnipeg", province: "Manitoba" },
    ],
    hiringHistory: [
      {
        position: "Dairy Processing Operator",
        location: "Granby, QC",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Quality Control Technician",
        location: "Saint-Hyacinthe, QC",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Production Line Worker",
        location: "Longueuil, QC",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Warehouse Associate",
        location: "Don Mills, ON",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Plant Operations Supervisor",
        location: "Granby, QC",
        type: "Full-time",
        salary: "$65,000–$80,000",
      },
      {
        title: "Food Safety Coordinator",
        location: "Longueuil, QC",
        type: "Full-time",
        salary: "$58,000–$72,000",
      },
      {
        title: "Maintenance Mechanic",
        location: "Saint-Hyacinthe, QC",
        type: "Full-time",
        salary: "$62,000–$78,000",
      },
    ],
  },
  {
    slug: "irving-oil",
    name: "Irving Oil",
    industry: "Oil & Gas",
    province: "New Brunswick",
    city: "Saint John",
    website: "https://www.irvingoil.com",
    careerPage: "https://www.irvingoil.com/en/careers",
    description:
      "Privately owned energy company operating Canada's largest refinery in Saint John, New Brunswick, along with a network of retail and distribution operations.",
    aiSummary:
      "Irving Oil is a privately owned Canadian energy company headquartered in Saint John, New Brunswick. The company operates Canada's largest refinery, capable of processing over 320,000 barrels of crude oil per day, and serves customers throughout Eastern Canada and the Northeastern United States. Founded in 1924 by K.C. Irving, the company remains part of the Irving Group of Companies and operates a network of retail gas stations, home heating services, and commercial fuel distribution.\n\nIrving Oil has utilized the Temporary Foreign Worker Program to address skilled labor needs at its Saint John refinery and related facilities. TFWP hiring has been concentrated in engineering roles (chemical, mechanical, and electrical engineers), as well as specialized trades for refinery maintenance and turnarounds. The company's location in Atlantic Canada, where skilled engineering talent can be challenging to recruit, has been a factor in its documented TFWP usage. Irving Oil has also invested in a number of clean energy and emissions-reduction projects at its refinery.",
    employeeCount: "4,000+",
    founded: "1924",
    locations: [
      { city: "Saint John", province: "New Brunswick" },
      { city: "Halifax", province: "Nova Scotia" },
      { city: "Moncton", province: "New Brunswick" },
    ],
    hiringHistory: [
      {
        position: "Chemical Engineer",
        location: "Saint John, NB",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Mechanical Engineer",
        location: "Saint John, NB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Refinery Operator",
        location: "Saint John, NB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Electrical Technician",
        location: "Saint John, NB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Senior Process Engineer",
        location: "Saint John, NB",
        type: "Full-time",
        salary: "$100,000–$135,000",
      },
      {
        title: "Turnaround Planner",
        location: "Saint John, NB",
        type: "Full-time",
        salary: "$85,000–$110,000",
      },
      {
        title: "Maintenance Technician",
        location: "Saint John, NB",
        type: "Full-time",
        salary: "$68,000–$85,000",
      },
    ],
  },
  {
    slug: "mccain-foods",
    name: "McCain Foods",
    industry: "Food Processing",
    province: "New Brunswick",
    city: "Florenceville-Bristol",
    website: "https://www.mccain.com",
    careerPage: "https://www.mccain.com/careers/",
    description:
      "Global frozen food giant headquartered in Florenceville-Bristol, New Brunswick, producing French fries and potato specialties in facilities worldwide.",
    aiSummary:
      "McCain Foods is a Canadian multinational frozen food company and the world's largest manufacturer of frozen French fries and potato specialties. Founded in 1957 by the McCain brothers in Florenceville-Bristol, New Brunswick, the company has grown into a global enterprise with 51 production facilities across six continents and over 20,000 employees. Although its reach is global, McCain Foods remains firmly rooted in New Brunswick, where its headquarters and several key production facilities are located.\n\nMcCain Foods has been a significant user of the Temporary Foreign Worker Program over the years, particularly for its potato processing facilities in New Brunswick and Alberta. TFWP hiring has been concentrated on production workers, machine operators, and maintenance technicians for its Canadian plants, which process millions of pounds of potatoes annually. The company's seasonal production cycles and the rural locations of many of its facilities have made local recruitment challenging, contributing to the company's reliance on the TFWP to maintain production capacity.",
    employeeCount: "20,000+",
    founded: "1957",
    locations: [
      { city: "Florenceville-Bristol", province: "New Brunswick" },
      { city: "Grand Falls", province: "New Brunswick" },
      { city: "Coaldale", province: "Alberta" },
      { city: "Portage la Prairie", province: "Manitoba" },
    ],
    hiringHistory: [
      {
        position: "Food Production Worker",
        location: "Florenceville-Bristol, NB",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Machine Operator",
        location: "Grand Falls, NB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Maintenance Technician",
        location: "Coaldale, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Production Supervisor",
        location: "Portage la Prairie, MB",
        year: 2023,
        status: "Completed",
      },
      {
        position: "Quality Control Inspector",
        location: "Florenceville-Bristol, NB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Maintenance Millwright",
        location: "Florenceville-Bristol, NB",
        type: "Full-time",
        salary: "$65,000–$82,000",
      },
      {
        title: "Production Team Lead",
        location: "Coaldale, AB",
        type: "Full-time",
        salary: "$58,000–$72,000",
      },
      {
        title: "Food Scientist",
        location: "Florenceville-Bristol, NB",
        type: "Full-time",
        salary: "$70,000–$90,000",
      },
    ],
  },
  {
    slug: "tfi-international",
    name: "TFI International",
    industry: "Transportation",
    province: "Quebec",
    city: "Montreal",
    website: "https://www.tfiintl.com",
    careerPage: "https://www.tfiintl.com/en/careers/",
    description:
      "One of North America's largest transportation and logistics companies, headquartered in Montreal with a vast network of trucking and logistics operations.",
    aiSummary:
      "TFI International is a Canadian transportation and logistics company headquartered in Montreal, Quebec, and one of the largest trucking companies in North America. Founded in 1957, TFI has grown through a series of acquisitions and now operates a network of over 100 operating companies across Canada, the United States, and Mexico. The company's services span package and courier, less-than-truckload, truckload, and logistics, with a workforce exceeding 25,000.\n\nTFI International has documented usage of the Temporary Foreign Worker Program to hire truck drivers, dispatchers, and logistics coordinators for its Canadian operations. The trucking industry in Canada has faced persistent driver shortages for years, and TFI has used the TFWP as one tool to address these gaps, hiring long-haul and regional truck drivers through the program. TFWP hiring has been spread across TFI's Canadian subsidiaries, with a concentration in Quebec and Ontario where the company's largest operations are based.",
    employeeCount: "25,000+",
    founded: "1957",
    locations: [
      { city: "Montreal", province: "Quebec" },
      { city: "Toronto", province: "Ontario" },
      { city: "Calgary", province: "Alberta" },
      { city: "Vancouver", province: "British Columbia" },
      { city: "Winnipeg", province: "Manitoba" },
    ],
    hiringHistory: [
      {
        position: "Long-Haul Truck Driver",
        location: "Montreal, QC",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Logistics Coordinator",
        location: "Toronto, ON",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Regional Truck Driver",
        location: "Calgary, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Dock Worker",
        location: "Montreal, QC",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "AZ Long-Haul Driver",
        location: "Montreal, QC",
        type: "Full-time",
        salary: "$60,000–$80,000",
      },
      {
        title: "Fleet Maintenance Manager",
        location: "Toronto, ON",
        type: "Full-time",
        salary: "$75,000–$95,000",
      },
      {
        title: "Logistics Analyst",
        location: "Calgary, AB",
        type: "Full-time",
        salary: "$55,000–$70,000",
      },
    ],
  },
  {
    slug: "loblaw-companies",
    name: "Loblaw Companies",
    industry: "Retail",
    province: "Ontario",
    city: "Brampton",
    website: "https://www.loblaw.ca",
    careerPage: "https://www.loblaw.ca/en/careers",
    description:
      "Canada's largest food and pharmacy retailer, headquartered in Brampton, Ontario, operating grocery stores, pharmacies, and distribution centers nationwide.",
    aiSummary:
      "Loblaw Companies Limited is Canada's largest retailer and a subsidiary of George Weston Limited. Headquartered in Brampton, Ontario, Loblaw operates over 2,400 stores across the country under banners including Loblaws, Real Canadian Superstore, No Frills, Shoppers Drug Mart, and many others. The company employs approximately 200,000 people, making it one of the largest private-sector employers in Canada, with operations spanning grocery retail, pharmacy, health and beauty, financial services, and apparel.\n\nLoblaw has been a documented user of the Temporary Foreign Worker Program to fill positions in its distribution centers and food processing facilities, as well as select retail locations in regions facing acute labor shortages. TFWP hiring has targeted roles such as warehouse associates, order pickers, and food processing workers for its supply chain operations. The company's scale and geographic reach across all ten provinces mean that local labor market conditions vary significantly, and TFWP usage has been most pronounced in Western Canada and Northern Ontario locations.",
    employeeCount: "200,000+",
    founded: "1919",
    locations: [
      { city: "Brampton", province: "Ontario" },
      { city: "Calgary", province: "Alberta" },
      { city: "Vancouver", province: "British Columbia" },
      { city: "Montreal", province: "Quebec" },
      { city: "Regina", province: "Saskatchewan" },
    ],
    hiringHistory: [
      {
        position: "Warehouse Associate",
        location: "Brampton, ON",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Order Picker",
        location: "Calgary, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Food Processing Worker",
        location: "Calgary, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Distribution Center Associate",
        location: "Regina, SK",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Logistics Supervisor",
        location: "Brampton, ON",
        type: "Full-time",
        salary: "$65,000–$82,000",
      },
      {
        title: "Pharmacy Assistant",
        location: "Vancouver, BC",
        type: "Part-time",
        salary: "$38,000–$48,000",
      },
      {
        title: "Store Manager Trainee",
        location: "Calgary, AB",
        type: "Full-time",
        salary: "$55,000–$70,000",
      },
    ],
  },
  {
    slug: "saputo-inc",
    name: "Saputo Inc.",
    industry: "Food Processing",
    province: "Quebec",
    city: "Montreal",
    website: "https://www.saputo.com",
    careerPage: "https://www.saputo.com/en/careers",
    description:
      "One of the world's largest dairy processors, headquartered in Montreal with operations across Canada, the United States, Argentina, and Australia.",
    aiSummary:
      "Saputo Inc. is a Canadian dairy company headquartered in Montreal, Quebec, and one of the top ten dairy processors in the world. Founded in 1954 by the Saputo family, the company began as a small cheese-making operation and has grown through strategic acquisitions into a global dairy giant with over 18,000 employees and 65 manufacturing facilities across four continents. In Canada, Saputo is the largest dairy processor, producing cheese, fluid milk, cream, cultured products, and dairy ingredients under brands such as Saputo, Alexis de Portneuf, and Armstrong.\n\nSaputo has utilized the Temporary Foreign Worker Program for its Canadian processing plants, hiring production workers, sanitation technicians, and equipment operators for facilities in Quebec, Ontario, and Alberta. The company's continuous production cycles and the labor-intensive nature of dairy processing have been factors in its documented TFWP usage. Saputo's broad geographic footprint means that TFWP hiring has been distributed across several provinces, though the largest concentration has been in Quebec where the company operates its largest facilities.",
    employeeCount: "18,000+",
    founded: "1954",
    locations: [
      { city: "Montreal", province: "Quebec" },
      { city: "Saint-Laurent", province: "Quebec" },
      { city: "Georgetown", province: "Ontario" },
      { city: "Edmonton", province: "Alberta" },
      { city: "Burnaby", province: "British Columbia" },
    ],
    hiringHistory: [
      {
        position: "Cheese Production Worker",
        location: "Saint-Laurent, QC",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Sanitation Technician",
        location: "Montreal, QC",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Packaging Operator",
        location: "Georgetown, ON",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Maintenance Helper",
        location: "Edmonton, AB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Production Manager",
        location: "Saint-Laurent, QC",
        type: "Full-time",
        salary: "$80,000–$100,000",
      },
      {
        title: "Quality Assurance Analyst",
        location: "Montreal, QC",
        type: "Full-time",
        salary: "$55,000–$70,000",
      },
      {
        title: "Industrial Mechanic",
        location: "Georgetown, ON",
        type: "Full-time",
        salary: "$65,000–$82,000",
      },
    ],
  },
  {
    slug: "teck-resources",
    name: "Teck Resources",
    industry: "Mining",
    province: "British Columbia",
    city: "Vancouver",
    website: "https://www.teck.com",
    careerPage: "https://www.teck.com/careers/",
    description:
      "Canada's largest diversified mining company, headquartered in Vancouver, producing copper, zinc, and steelmaking coal for global markets.",
    aiSummary:
      "Teck Resources Limited is Canada's largest diversified resource company, headquartered in Vancouver, British Columbia. Founded in 1913, Teck has evolved from a small gold mining operation into a global mining leader with operations in Canada, the United States, Chile, and Peru. The company is a major producer of copper, zinc, and steelmaking coal, and employs over 10,000 people. Teck's Canadian operations include the Highland Valley Copper mine in BC, the Trail smelting and refining complex, and steelmaking coal operations in the Elk Valley region of southeastern British Columbia.\n\nTeck Resources has been a documented user of the Temporary Foreign Worker Program, primarily to fill specialized engineering and technical positions at its mining and smelting operations in British Columbia. TFWP hiring has targeted roles such as mining engineers, geologists, metallurgists, and heavy-duty mechanics for its Canadian sites. The remote locations of many of Teck's operations, combined with the specialized skills required, have contributed to the company's use of the TFWP as a workforce solution.",
    employeeCount: "10,000+",
    founded: "1913",
    locations: [
      { city: "Vancouver", province: "British Columbia" },
      { city: "Trail", province: "British Columbia" },
      { city: "Sparwood", province: "British Columbia" },
      { city: "Logan Lake", province: "British Columbia" },
      { city: "Calgary", province: "Alberta" },
    ],
    hiringHistory: [
      {
        position: "Mining Engineer",
        location: "Sparwood, BC",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Metallurgist",
        location: "Trail, BC",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Heavy-Duty Mechanic",
        location: "Logan Lake, BC",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Geologist",
        location: "Vancouver, BC",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Senior Mining Engineer",
        location: "Sparwood, BC",
        type: "Full-time",
        salary: "$105,000–$140,000",
      },
      {
        title: "Environmental Coordinator",
        location: "Trail, BC",
        type: "Full-time",
        salary: "$80,000–$100,000",
      },
      {
        title: "Mill Operator",
        location: "Logan Lake, BC",
        type: "Full-time",
        salary: "$65,000–$82,000",
      },
    ],
  },
  {
    slug: "cgi-inc",
    name: "CGI Inc.",
    industry: "Technology",
    province: "Quebec",
    city: "Montreal",
    website: "https://www.cgi.com",
    careerPage: "https://www.cgi.com/en/careers",
    description:
      "One of the world's largest IT and business consulting firms, founded and headquartered in Montreal with offices across Canada and globally.",
    aiSummary:
      "CGI Inc. is a Canadian multinational information technology consulting and systems integration company headquartered in Montreal, Quebec. Founded in 1976 by Serge Godin and André Imbeau, CGI has grown into one of the world's largest IT consulting firms, with over 90,000 employees across 400 offices in more than 40 countries. CGI provides a broad range of services including IT and business consulting, systems integration, application development, and managed IT services to clients in government, financial services, healthcare, telecommunications, and other industries.\n\nCGI has utilized the Temporary Foreign Worker Program to address specific skill shortages in the Canadian IT labor market, hiring software developers, systems analysts, cybersecurity specialists, and IT consultants through the program. TFWP hiring has been concentrated in CGI's major Canadian offices in Montreal, Toronto, and Ottawa, where demand for experienced IT professionals often exceeds local supply. CGI's project-based business model means that specific skill sets are sometimes in high demand for particular client engagements, contributing to targeted TFWP usage.",
    employeeCount: "90,000+",
    founded: "1976",
    locations: [
      { city: "Montreal", province: "Quebec" },
      { city: "Toronto", province: "Ontario" },
      { city: "Ottawa", province: "Ontario" },
      { city: "Vancouver", province: "British Columbia" },
      { city: "Edmonton", province: "Alberta" },
    ],
    hiringHistory: [
      {
        position: "Software Developer",
        location: "Montreal, QC",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Cybersecurity Analyst",
        location: "Ottawa, ON",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Systems Analyst",
        location: "Toronto, ON",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Cloud Architect",
        location: "Montreal, QC",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Full-Stack Developer",
        location: "Montreal, QC",
        type: "Full-time",
        salary: "$85,000–$115,000",
      },
      {
        title: "DevOps Engineer",
        location: "Toronto, ON",
        type: "Full-time",
        salary: "$100,000–$135,000",
      },
      {
        title: "IT Project Manager",
        location: "Ottawa, ON",
        type: "Full-time",
        salary: "$90,000–$125,000",
      },
    ],
  },
  {
    slug: "jd-irving",
    name: "J.D. Irving",
    industry: "Manufacturing",
    province: "New Brunswick",
    city: "Saint John",
    website: "https://www.jdirving.com",
    careerPage: "https://www.jdirving.com/careers",
    description:
      "Diversified manufacturing conglomerate based in Saint John, New Brunswick, with operations in forestry, shipbuilding, transportation, and consumer products.",
    aiSummary:
      "J.D. Irving, Limited (JDI) is a privately held diversified conglomerate headquartered in Saint John, New Brunswick. Founded in 1882 by James Dergavel Irving, the company has grown to encompass operations in forestry and forest products, shipbuilding, transportation, retail, and consumer products manufacturing. The Irving Group of Companies, which includes J.D. Irving, is one of Atlantic Canada's largest employers with over 16,000 employees across its various divisions.\n\nJ.D. Irving has been a documented user of the Temporary Foreign Worker Program across several of its business divisions. The company's forestry operations in New Brunswick and Nova Scotia have used the TFWP to hire equipment operators and mill workers, while its shipbuilding division in Halifax has sought skilled welders and marine trades workers through the program. JDI's food processing operations, part of the Cavendish Farms division, have also used the TFWP to fill production roles at facilities in Prince Edward Island and New Brunswick.",
    employeeCount: "16,000+",
    founded: "1882",
    locations: [
      { city: "Saint John", province: "New Brunswick" },
      { city: "Halifax", province: "Nova Scotia" },
      { city: "Dieppe", province: "New Brunswick" },
      { city: "New Annan", province: "Prince Edward Island" },
    ],
    hiringHistory: [
      {
        position: "Welder",
        location: "Halifax, NS",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Forestry Equipment Operator",
        location: "Saint John, NB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Food Production Worker",
        location: "New Annan, PE",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Millwright",
        location: "Dieppe, NB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Marine Electrician",
        location: "Halifax, NS",
        type: "Full-time",
        salary: "$70,000–$90,000",
      },
      {
        title: "Forest Operations Supervisor",
        location: "Saint John, NB",
        type: "Full-time",
        salary: "$65,000–$85,000",
      },
      {
        title: "Industrial Painter",
        location: "Halifax, NS",
        type: "Full-time",
        salary: "$55,000–$68,000",
      },
    ],
  },
  {
    slug: "westjet",
    name: "WestJet",
    industry: "Transportation",
    province: "Alberta",
    city: "Calgary",
    website: "https://www.westjet.com",
    careerPage: "https://www.westjet.com/en-ca/careers",
    description:
      "Canada's second-largest airline, headquartered in Calgary, Alberta, operating domestic and international flights with a growing fleet and workforce.",
    aiSummary:
      "WestJet Airlines is a Canadian airline founded in 1996 and headquartered in Calgary, Alberta. Starting as a low-cost alternative to Canada's major airlines, WestJet has grown into the country's second-largest carrier, serving over 100 destinations across Canada, the United States, Mexico, the Caribbean, Central America, and Europe. The airline operates a fleet of Boeing and Bombardier aircraft and employs over 14,000 people, known in the company as 'WestJetters.'\n\nWestJet has been a documented user of the Temporary Foreign Worker Program, primarily to address shortages of qualified pilots and aircraft maintenance engineers (AMEs) in the Canadian labor market. The airline industry faces specific challenges in recruiting experienced flight crew and maintenance personnel, and WestJet has used the TFWP to fill these specialized roles. TFWP hiring at WestJet has been concentrated at its Calgary headquarters and major hubs in Toronto and Vancouver, and has included both direct hires through the program and transitions from temporary to permanent residency for foreign workers.",
    employeeCount: "14,000+",
    founded: "1996",
    locations: [
      { city: "Calgary", province: "Alberta" },
      { city: "Toronto", province: "Ontario" },
      { city: "Vancouver", province: "British Columbia" },
    ],
    hiringHistory: [
      {
        position: "Aircraft Maintenance Engineer",
        location: "Calgary, AB",
        year: 2025,
        status: "Approved",
      },
      {
        position: "First Officer",
        location: "Calgary, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Avionics Technician",
        location: "Calgary, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Ground Service Agent",
        location: "Toronto, ON",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Captain — Boeing 737",
        location: "Calgary, AB",
        type: "Full-time",
        salary: "$160,000–$220,000",
      },
      {
        title: "Flight Attendant",
        location: "Toronto, ON",
        type: "Full-time",
        salary: "$50,000–$65,000",
      },
      {
        title: "IT Support Analyst",
        location: "Calgary, AB",
        type: "Full-time",
        salary: "$60,000–$78,000",
      },
    ],
  },
  {
    slug: "richardson-international",
    name: "Richardson International",
    industry: "Agriculture",
    province: "Manitoba",
    city: "Winnipeg",
    website: "https://www.richardson.ca",
    careerPage: "https://www.richardson.ca/careers/",
    description:
      "Canada's largest privately owned agribusiness, headquartered in Winnipeg, Manitoba, with operations in grain handling, crop inputs, and food processing.",
    aiSummary:
      "Richardson International is Canada's largest privately owned agribusiness and a global leader in grain handling and merchandising. Headquartered in Winnipeg, Manitoba, Richardson has been in operation since 1857 and is now a subsidiary of James Richardson & Sons, Limited. The company operates a network of over 70 grain elevators across Western Canada, along with crop input retail facilities, oat and canola processing plants, and a milling operation. Richardson handles millions of metric tons of grain each year, connecting Canadian farmers with customers in over 55 countries.\n\nRichardson International has been a documented user of the Temporary Foreign Worker Program, primarily to fill roles in its grain handling and food processing operations in Manitoba and Saskatchewan. TFWP hiring has targeted positions such as grain elevator operators, production workers at its oat and canola processing facilities, and general laborers for the company's agricultural operations. The seasonal nature of grain handling and the rural locations of many Richardson facilities have been contributing factors to the company's use of the TFWP to maintain adequate staffing.",
    employeeCount: "2,800+",
    founded: "1857",
    locations: [
      { city: "Winnipeg", province: "Manitoba" },
      { city: "Portage la Prairie", province: "Manitoba" },
      { city: "Lethbridge", province: "Alberta" },
      { city: "Yorkton", province: "Saskatchewan" },
      { city: "Thunder Bay", province: "Ontario" },
    ],
    hiringHistory: [
      {
        position: "Grain Elevator Operator",
        location: "Yorkton, SK",
        year: 2025,
        status: "Approved",
      },
      {
        position: "Production Worker",
        location: "Portage la Prairie, MB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "General Labourer",
        location: "Lethbridge, AB",
        year: 2024,
        status: "Approved",
      },
      {
        position: "Mill Operator",
        location: "Winnipeg, MB",
        year: 2023,
        status: "Completed",
      },
    ],
    openPositions: [
      {
        title: "Grain Merchandiser",
        location: "Winnipeg, MB",
        type: "Full-time",
        salary: "$65,000–$85,000",
      },
      {
        title: "Maintenance Electrician",
        location: "Portage la Prairie, MB",
        type: "Full-time",
        salary: "$68,000–$85,000",
      },
      {
        title: "Agronomist",
        location: "Yorkton, SK",
        type: "Full-time",
        salary: "$60,000–$80,000",
      },
    ],
  },

    {
      slug: "magna-international",
      name: "Magna International",
      industry: "Manufacturing",
      province: "Ontario",
      city: "Aurora",
      website: "https://www.magna.com",
      careerPage: "https://www.magna.com/careers",
      description: "One of the world's largest automotive suppliers, headquartered in Aurora, Ontario, with over 340 manufacturing facilities and 90 product development centers across 28 countries.",
      aiSummary: "Magna International is a Canadian global automotive supplier headquartered in Aurora, Ontario, and one of the largest automotive parts manufacturers in the world. Founded in 1957 by Frank Stronach, Magna has grown from a small tool and die shop into a mobility technology company with over 170,000 employees across 28 countries. The company designs, develops, and manufactures automotive systems, assemblies, modules, and components for major automakers including Ford, General Motors, Stellantis, BMW, Mercedes-Benz, and Tesla. Magna's Canadian operations are concentrated in Ontario, where the company operates multiple manufacturing facilities producing body and chassis systems, exteriors, seating, and powertrain components.\n\nMagna has been a documented user of the Temporary Foreign Worker Program to fill specialized manufacturing and engineering roles at its Ontario facilities. TFWP hiring has targeted positions such as tool and die makers, industrial mechanics, production welders, and manufacturing engineers for the company's automotive parts plants in Aurora, Brampton, St. Thomas, and other Ontario locations. The highly specialized nature of automotive manufacturing, combined with competitive pressure from US-based automakers, has contributed to Magna's use of the TFWP to access skilled tradespeople and engineers when domestic recruitment has been insufficient.",
      employeeCount: "170,000+",
      founded: "1957",
      locations: [
        {
          city: "Aurora",
          province: "Ontario"
        },
        {
          city: "Brampton",
          province: "Ontario"
        },
        {
          city: "St. Thomas",
          province: "Ontario"
        },
        {
          city: "Guelph",
          province: "Ontario"
        },
      ],
      hiringHistory: [
        {
          position: "Tool and Die Maker",
          location: "Aurora, ON",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Production Welder",
          location: "Brampton, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Manufacturing Engineer",
          location: "St. Thomas, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Industrial Mechanic",
          location: "Guelph, ON",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Tool and Die Maker",
          location: "Aurora, ON",
          type: "Full-time",
          salary: "$70,000–$90,000"
        },
        {
          title: "Quality Engineer",
          location: "Brampton, ON",
          type: "Full-time",
          salary: "$75,000–$95,000"
        },
        {
          title: "CNC Machinist",
          location: "Guelph, ON",
          type: "Full-time",
          salary: "$58,000–$72,000"
        },
      ]
    },
    {
      slug: "canadian-natural-resources",
      name: "Canadian Natural Resources (CNRL)",
      industry: "Oil & Gas",
      province: "Alberta",
      city: "Calgary",
      website: "https://www.cnrl.com",
      careerPage: "https://www.cnrl.com/careers",
      description: "One of Canada's largest independent crude oil and natural gas producers, headquartered in Calgary with extensive oil sands mining and in situ operations across Alberta.",
      aiSummary: "Canadian Natural Resources Limited (CNRL) is a Calgary-based senior oil and natural gas production company and one of the largest independent crude oil and natural gas producers in the world. Founded in 1973, CNRL has built a diverse portfolio of assets across Western Canada, the UK North Sea, and Offshore Africa. The company's core operations include the Horizon Oil Sands mining and upgrading facility north of Fort McMurray, the Athabasca Oil Sands Project, and extensive in situ thermal oil operations. CNRL employs over 10,000 people and is known for its disciplined approach to capital allocation and operational efficiency.\n\nCNRL has been a significant user of the Temporary Foreign Worker Program, particularly for its oil sands operations in Northern Alberta where skilled labor shortages are acute. TFWP hiring has concentrated on heavy equipment operators, process operators, maintenance tradespeople, and engineers for the company's Horizon and other oil sands facilities. The remote location and challenging working conditions of oil sands operations, combined with the specialized skills required, have made the TFWP an important workforce tool for CNRL's Alberta operations.",
      employeeCount: "10,000+",
      founded: "1973",
      locations: [
        {
          city: "Calgary",
          province: "Alberta"
        },
        {
          city: "Fort McMurray",
          province: "Alberta"
        },
        {
          city: "Bonnyville",
          province: "Alberta"
        },
      ],
      hiringHistory: [
        {
          position: "Process Operator",
          location: "Fort McMurray, AB",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Heavy Equipment Operator",
          location: "Fort McMurray, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Maintenance Millwright",
          location: "Bonnyville, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Production Engineer",
          location: "Calgary, AB",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Senior Process Engineer",
          location: "Fort McMurray, AB",
          type: "Full-time",
          salary: "$115,000–$150,000"
        },
        {
          title: "Maintenance Planner",
          location: "Calgary, AB",
          type: "Full-time",
          salary: "$90,000–$115,000"
        },
        {
          title: "Field Operator",
          location: "Bonnyville, AB",
          type: "Full-time",
          salary: "$65,000–$82,000"
        },
      ]
    },
    {
      slug: "desjardins-group",
      name: "Desjardins Group",
      industry: "Finance",
      province: "Quebec",
      city: "Lévis",
      website: "https://www.desjardins.com",
      careerPage: "https://www.desjardins.com/careers",
      description: "The largest federation of credit unions in North America, headquartered in Lévis, Quebec, providing banking, insurance, and wealth management services across Canada.",
      aiSummary: "Desjardins Group is a Canadian financial services cooperative and the largest federation of credit unions in North America. Founded in 1900 by Alphonse Desjardins in Lévis, Quebec, the organization has grown to serve over 7 million members and clients through a network of more than 200 caisses (credit unions) and 800 service centres primarily in Quebec, with additional operations in Ontario and other provinces. Desjardins offers a full suite of financial products including personal and commercial banking, insurance (life, health, property, and casualty), wealth management, and securities brokerage.\n\nDesjardins has been a documented user of the Temporary Foreign Worker Program to fill specialized roles in information technology, actuarial science, and risk management. TFWP hiring has been concentrated at the organization's headquarters in Lévis and its major operational centres in Montreal, targeting positions such as software developers, data analysts, cybersecurity specialists, and financial risk analysts. The financial services sector's ongoing digital transformation and the competitive talent market in Montreal have been contributing factors to Desjardins' targeted use of the TFWP for hard-to-fill technical and specialized positions.",
      employeeCount: "58,000+",
      founded: "1900",
      locations: [
        {
          city: "Lévis",
          province: "Quebec"
        },
        {
          city: "Montreal",
          province: "Quebec"
        },
        {
          city: "Quebec City",
          province: "Quebec"
        },
      ],
      hiringHistory: [
        {
          position: "Software Developer",
          location: "Montreal, QC",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Actuarial Analyst",
          location: "Lévis, QC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Cybersecurity Specialist",
          location: "Montreal, QC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Financial Risk Analyst",
          location: "Lévis, QC",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Full-Stack Developer",
          location: "Montreal, QC",
          type: "Full-time",
          salary: "$80,000–$105,000"
        },
        {
          title: "Actuarial Analyst",
          location: "Lévis, QC",
          type: "Full-time",
          salary: "$70,000–$90,000"
        },
        {
          title: "Data Engineer",
          location: "Montreal, QC",
          type: "Full-time",
          salary: "$90,000–$120,000"
        },
      ]
    },
    {
      slug: "george-weston-limited",
      name: "George Weston Limited",
      industry: "Retail",
      province: "Ontario",
      city: "Toronto",
      website: "https://www.weston.ca",
      careerPage: "https://www.weston.ca/en/careers",
      description: "Canadian holding company and the parent of Loblaw Companies and Weston Foods, headquartered in Toronto with operations in food processing, baking, and retail across Canada.",
      aiSummary: "George Weston Limited is a Canadian public company founded in 1882 and headquartered in Toronto, Ontario. The company operates through its two primary subsidiaries: Loblaw Companies Limited, Canada's largest food and pharmacy retailer, and Weston Foods, a leading North American bakery. Through Loblaw, George Weston touches the lives of millions of Canadians daily, operating over 2,400 stores under banners such as Loblaws, Real Canadian Superstore, Shoppers Drug Mart, and No Frills. The company employs approximately 200,000 people across its subsidiaries, making it one of Canada's largest private-sector employers.\n\nGeorge Weston Limited and its subsidiaries have been documented users of the Temporary Foreign Worker Program, with the majority of TFWP hiring occurring through Loblaw Companies. TFWP hiring has focused on distribution centre workers, food processing workers, and skilled trades for Loblaw's supply chain, as well as bakery production workers for Weston Foods' manufacturing facilities in Ontario and Quebec. The scale and geographic reach of the company's operations mean that TFWP usage varies by region, with the highest demand in Western Canada and Northern Ontario where labor shortages are most pronounced.",
      employeeCount: "200,000+",
      founded: "1882",
      locations: [
        {
          city: "Toronto",
          province: "Ontario"
        },
        {
          city: "Brampton",
          province: "Ontario"
        },
        {
          city: "Montreal",
          province: "Quebec"
        },
      ],
      hiringHistory: [
        {
          position: "Bakery Production Worker",
          location: "Toronto, ON",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Distribution Centre Associate",
          location: "Brampton, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Maintenance Electrician",
          location: "Montreal, QC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Food Safety Technician",
          location: "Toronto, ON",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Supply Chain Analyst",
          location: "Brampton, ON",
          type: "Full-time",
          salary: "$65,000–$82,000"
        },
        {
          title: "Bakery Plant Supervisor",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$70,000–$88,000"
        },
        {
          title: "Food Safety Specialist",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$62,000–$78,000"
        },
      ]
    },
    {
      slug: "canadian-pacific-kansas-city",
      name: "Canadian Pacific Kansas City (CPKC)",
      industry: "Transportation",
      province: "Alberta",
      city: "Calgary",
      website: "https://www.cpkcr.com",
      careerPage: "https://www.cpkcr.com/en/careers",
      description: "The first and only single-line railway connecting Canada, the United States, and Mexico, headquartered in Calgary with a 20,000-mile rail network spanning North America.",
      aiSummary: "Canadian Pacific Kansas City (CPKC) is the first and only single-line railway connecting Canada, the United States, and Mexico. Formed in 2023 through the merger of Canadian Pacific Railway and Kansas City Southern, CPKC is headquartered in Calgary, Alberta, and operates a combined rail network of approximately 20,000 miles across all three North American countries. The company provides freight transportation services including bulk commodities, intermodal, automotive, forest products, and energy-related shipments, employing over 20,000 people across its operations.\n\nCPKC has been a documented user of the Temporary Foreign Worker Program, following in the footsteps of its predecessor Canadian Pacific Railway. TFWP hiring has primarily targeted conductors, locomotive engineers, and track maintenance workers for the company's Canadian operations. The railway industry across North America faces ongoing challenges in recruiting and retaining qualified operating personnel, and CPKC has used the TFWP as one strategy to address workforce gaps, particularly for operations in Western Canada where competing industries like oil and gas create tight labor markets for skilled trades.",
      employeeCount: "20,000+",
      founded: "1881",
      locations: [
        {
          city: "Calgary",
          province: "Alberta"
        },
        {
          city: "Winnipeg",
          province: "Manitoba"
        },
        {
          city: "Moose Jaw",
          province: "Saskatchewan"
        },
        {
          city: "Montreal",
          province: "Quebec"
        },
      ],
      hiringHistory: [
        {
          position: "Locomotive Engineer",
          location: "Calgary, AB",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Rail Conductor",
          location: "Moose Jaw, SK",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Track Maintenance Worker",
          location: "Winnipeg, MB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Signals Technician",
          location: "Calgary, AB",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Train Conductor",
          location: "Moose Jaw, SK",
          type: "Full-time",
          salary: "$75,000–$95,000"
        },
        {
          title: "Diesel Mechanic",
          location: "Calgary, AB",
          type: "Full-time",
          salary: "$72,000–$90,000"
        },
        {
          title: "Track Foreman",
          location: "Winnipeg, MB",
          type: "Full-time",
          salary: "$68,000–$85,000"
        },
      ]
    },
    {
      slug: "sobeys-inc",
      name: "Sobeys Inc.",
      industry: "Retail",
      province: "Nova Scotia",
      city: "Stellarton",
      website: "https://www.sobeys.com",
      careerPage: "https://www.sobeys.com/en/careers",
      description: "Canada's second-largest grocery retailer, headquartered in Stellarton, Nova Scotia, operating over 1,500 stores under banners including Sobeys, Safeway, IGA, and FreshCo.",
      aiSummary: "Sobeys Inc. is a Canadian grocery retailer and a wholly owned subsidiary of Empire Company Limited. Headquartered in Stellarton, Nova Scotia, Sobeys has been serving Canadian communities since 1907 and has grown to become Canada's second-largest grocery retailer, operating more than 1,500 stores across all ten provinces. The company's retail banners include Sobeys, Safeway, IGA, Foodland, FreshCo, Farm Boy, and Thrifty Foods, along with its Voilà online grocery delivery platform. Sobeys employs over 120,000 people across its retail network, distribution centres, and support offices.\n\nSobeys has been a documented user of the Temporary Foreign Worker Program, primarily to fill roles in its distribution centres and food processing operations. TFWP hiring has targeted warehouse associates, order pickers, meat cutters, and skilled trades for the company's supply chain facilities, particularly in Western Canada and Atlantic Canada where labor markets are tighter. The retail grocery sector's competitive labor environment and the physical demands of distribution centre work have been contributing factors to Sobeys' use of the TFWP.",
      employeeCount: "120,000+",
      founded: "1907",
      locations: [
        {
          city: "Stellarton",
          province: "Nova Scotia"
        },
        {
          city: "Calgary",
          province: "Alberta"
        },
        {
          city: "Mississauga",
          province: "Ontario"
        },
        {
          city: "Edmonton",
          province: "Alberta"
        },
      ],
      hiringHistory: [
        {
          position: "Meat Cutter",
          location: "Calgary, AB",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Warehouse Associate",
          location: "Mississauga, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Order Picker",
          location: "Edmonton, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Forklift Operator",
          location: "Stellarton, NS",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Store Manager",
          location: "Calgary, AB",
          type: "Full-time",
          salary: "$65,000–$85,000"
        },
        {
          title: "Meat Department Manager",
          location: "Edmonton, AB",
          type: "Full-time",
          salary: "$55,000–$70,000"
        },
        {
          title: "Supply Chain Coordinator",
          location: "Mississauga, ON",
          type: "Full-time",
          salary: "$58,000–$72,000"
        },
      ]
    },
    {
      slug: "imperial-oil",
      name: "Imperial Oil",
      industry: "Oil & Gas",
      province: "Alberta",
      city: "Calgary",
      website: "https://www.imperialoil.ca",
      careerPage: "https://www.imperialoil.ca/en-ca/careers",
      description: "Canada's largest petroleum refiner and a major producer of crude oil, headquartered in Calgary with operations spanning oil sands, refining, and petrochemicals.",
      aiSummary: "Imperial Oil Limited is one of Canada's largest integrated oil companies and has been a cornerstone of the Canadian energy industry since its founding in 1880. Headquartered in Calgary, Alberta, Imperial is majority-owned by ExxonMobil and operates across the full value chain: upstream oil sands production at Cold Lake and Kearl, the Strathcona Refinery near Edmonton, petrochemical manufacturing in Sarnia, Ontario, and a network of approximately 2,400 Esso and Mobil retail stations across Canada. The company employs over 5,000 people and is a major contributor to Canada's energy infrastructure.\n\nImperial Oil has been a documented user of the Temporary Foreign Worker Program, primarily for skilled trades and engineering roles at its oil sands operations and refinery facilities. TFWP hiring has targeted positions such as process operators, mechanical engineers, instrumentation technicians, and turnaround specialists. The company's operations in Northern Alberta, where workforce availability is constrained by remote location and competition from other energy companies, have been the primary driver of Imperial's TFWP usage, supplemented by occasional hiring for specialized technical roles at its refinery and petrochemical facilities.",
      employeeCount: "5,000+",
      founded: "1880",
      locations: [
        {
          city: "Calgary",
          province: "Alberta"
        },
        {
          city: "Cold Lake",
          province: "Alberta"
        },
        {
          city: "Edmonton",
          province: "Alberta"
        },
        {
          city: "Sarnia",
          province: "Ontario"
        },
      ],
      hiringHistory: [
        {
          position: "Process Operator",
          location: "Cold Lake, AB",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Instrumentation Technician",
          location: "Edmonton, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Mechanical Engineer",
          location: "Calgary, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Turnaround Planner",
          location: "Sarnia, ON",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Senior Reservoir Engineer",
          location: "Calgary, AB",
          type: "Full-time",
          salary: "$120,000–$160,000"
        },
        {
          title: "Refinery Operator",
          location: "Edmonton, AB",
          type: "Full-time",
          salary: "$75,000–$95,000"
        },
        {
          title: "Environmental Advisor",
          location: "Cold Lake, AB",
          type: "Full-time",
          salary: "$90,000–$115,000"
        },
      ]
    },
    {
      slug: "opentext-corporation",
      name: "OpenText Corporation",
      industry: "Technology",
      province: "Ontario",
      city: "Waterloo",
      website: "https://www.opentext.com",
      careerPage: "https://www.opentext.com/careers",
      description: "Canada's largest software company, headquartered in Waterloo, Ontario, providing enterprise information management solutions to organizations worldwide.",
      aiSummary: "OpenText Corporation is Canada's largest software company and a global leader in enterprise information management (EIM). Founded in 1991 by University of Waterloo professors and headquartered in Waterloo, Ontario, OpenText has grown through a combination of organic growth and strategic acquisitions to employ over 20,000 people serving more than 100,000 customers worldwide. The company's platform enables organizations to manage, secure, and leverage their information through solutions in content management, business networks, digital experience, security, and analytics. Recent major acquisitions include Micro Focus in 2023, significantly expanding OpenText's enterprise software portfolio.\n\nOpenText has been a documented user of the Temporary Foreign Worker Program to address specific skill shortages in the Canadian technology sector. TFWP hiring has targeted senior software developers, cloud architects, cybersecurity engineers, and AI/machine learning specialists for the company's Waterloo headquarters and other Canadian offices. The competitive nature of the North American tech talent market, combined with OpenText's need for specialized enterprise software expertise, has driven the company's use of the TFWP for niche roles where Canadian candidates with the required skills are difficult to find.",
      employeeCount: "20,000+",
      founded: "1991",
      locations: [
        {
          city: "Waterloo",
          province: "Ontario"
        },
        {
          city: "Richmond Hill",
          province: "Ontario"
        },
        {
          city: "Ottawa",
          province: "Ontario"
        },
        {
          city: "Montreal",
          province: "Quebec"
        },
      ],
      hiringHistory: [
        {
          position: "Senior Software Developer",
          location: "Waterloo, ON",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Cloud Solutions Architect",
          location: "Richmond Hill, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Cybersecurity Engineer",
          location: "Ottawa, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Machine Learning Engineer",
          location: "Waterloo, ON",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Senior Java Developer",
          location: "Waterloo, ON",
          type: "Full-time",
          salary: "$110,000–$145,000"
        },
        {
          title: "DevOps Engineer",
          location: "Richmond Hill, ON",
          type: "Full-time",
          salary: "$100,000–$130,000"
        },
        {
          title: "Technical Support Specialist",
          location: "Ottawa, ON",
          type: "Full-time",
          salary: "$60,000–$78,000"
        },
      ]
    },
    {
      slug: "bombardier-inc",
      name: "Bombardier Inc.",
      industry: "Manufacturing",
      province: "Quebec",
      city: "Montreal",
      website: "https://www.bombardier.com",
      careerPage: "https://www.bombardier.com/en/careers",
      description: "Global leader in business aviation, headquartered in Montreal, Quebec, designing, manufacturing, and servicing the world's most renowned business jets.",
      aiSummary: "Bombardier Inc. is a Canadian manufacturer of business jets and a global leader in the aviation industry. Founded in 1942 by Joseph-Armand Bombardier in Valcourt, Quebec, the company started with snowmobiles before expanding into aerospace and rail transportation. Today, focused exclusively on business aviation after divesting its commercial aircraft and rail divisions, Bombardier designs, manufactures, and services the Challenger and Global family of business jets from its headquarters in Montreal and manufacturing facilities in the Greater Toronto Area. The company employs over 17,000 people worldwide.\n\nBombardier has been a documented user of the Temporary Foreign Worker Program, primarily to fill specialized aerospace manufacturing and engineering roles at its Canadian facilities. TFWP hiring has targeted positions such as aerospace engineers, avionics technicians, structural assemblers, and composite technicians for the company's operations in the Montreal and Toronto areas. The highly specialized nature of aerospace manufacturing, the rigorous certification requirements, and global competition for experienced aerospace talent have all contributed to Bombardier's targeted use of the TFWP to supplement its Canadian workforce.",
      employeeCount: "17,000+",
      founded: "1942",
      locations: [
        {
          city: "Montreal",
          province: "Quebec"
        },
        {
          city: "Toronto",
          province: "Ontario"
        },
        {
          city: "Dorval",
          province: "Quebec"
        },
      ],
      hiringHistory: [
        {
          position: "Aerospace Engineer",
          location: "Montreal, QC",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Structural Assembler",
          location: "Dorval, QC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Avionics Technician",
          location: "Toronto, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Composite Technician",
          location: "Montreal, QC",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Aerospace Stress Engineer",
          location: "Montreal, QC",
          type: "Full-time",
          salary: "$95,000–$125,000"
        },
        {
          title: "Aircraft Electrician",
          location: "Dorval, QC",
          type: "Full-time",
          salary: "$65,000–$82,000"
        },
        {
          title: "Supply Chain Specialist",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$68,000–$85,000"
        },
      ]
    },
    {
      slug: "nutrien-ltd",
      name: "Nutrien Ltd.",
      industry: "Agriculture",
      province: "Saskatchewan",
      city: "Saskatoon",
      website: "https://www.nutrien.com",
      careerPage: "https://www.nutrien.com/careers",
      description: "The world's largest provider of crop inputs and services, headquartered in Saskatoon, Saskatchewan, producing and distributing potash, nitrogen, and phosphate fertilizers globally.",
      aiSummary: "Nutrien Ltd. is a Canadian fertilizer company and the world's largest provider of crop inputs and services. Formed in 2018 through the merger of PotashCorp and Agrium, Nutrien is headquartered in Saskatoon, Saskatchewan, and employs over 25,000 people across its global operations. The company is the world's largest producer of potash, the third-largest producer of nitrogen fertilizer, and operates a network of over 2,000 retail locations across North America, South America, and Australia. Nutrien's Saskatchewan potash mines are among the most productive in the world, supplying essential crop nutrients to farmers in over 40 countries.\n\nNutrien has been a documented user of the Temporary Foreign Worker Program across its Canadian operations, particularly at its potash mining and processing facilities in Saskatchewan. TFWP hiring has targeted underground miners, mill operators, heavy-duty mechanics, and process engineers for the company's potash operations. The remote locations of mining operations in Saskatchewan, combined with the specialized skills required for underground mining and mineral processing, have driven Nutrien's use of the TFWP to supplement its domestic workforce.",
      employeeCount: "25,000+",
      founded: "2018",
      locations: [
        {
          city: "Saskatoon",
          province: "Saskatchewan"
        },
        {
          city: "Rocanville",
          province: "Saskatchewan"
        },
        {
          city: "Lanigan",
          province: "Saskatchewan"
        },
        {
          city: "Calgary",
          province: "Alberta"
        },
      ],
      hiringHistory: [
        {
          position: "Underground Miner",
          location: "Rocanville, SK",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Mill Operator",
          location: "Lanigan, SK",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Heavy-Duty Mechanic",
          location: "Saskatoon, SK",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Process Engineer",
          location: "Saskatoon, SK",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Underground Mine Engineer",
          location: "Rocanville, SK",
          type: "Full-time",
          salary: "$100,000–$130,000"
        },
        {
          title: "Maintenance Planner",
          location: "Saskatoon, SK",
          type: "Full-time",
          salary: "$80,000–$100,000"
        },
        {
          title: "Agronomist",
          location: "Lanigan, SK",
          type: "Full-time",
          salary: "$65,000–$85,000"
        },
      ]
    },
    {
      slug: "rogers-communications",
      name: "Rogers Communications",
      industry: "Telecommunications",
      province: "Ontario",
      city: "Toronto",
      website: "https://www.rogers.com",
      careerPage: "https://www.rogers.com/careers",
      description: "Canada's largest wireless telecommunications provider, headquartered in Toronto, Ontario, delivering wireless, cable, internet, and media services to millions of Canadians.",
      aiSummary: "Rogers Communications Inc. is a Canadian communications and media company and the largest wireless service provider in Canada. Founded in 1960 by Ted Rogers, the company is headquartered in Toronto, Ontario, and employs over 25,000 people. Following its merger with Shaw Communications in 2023, Rogers now serves more than 11 million wireless subscribers and operates an extensive cable and internet network spanning much of Canada. The company's business encompasses wireless communications, residential internet and television, and a media division that includes Sportsnet, Toronto Blue Jays, and a portfolio of radio and television stations.\n\nRogers Communications has been a documented user of the Temporary Foreign Worker Program, primarily to address specific skill shortages in the telecommunications and technology sectors. TFWP hiring has targeted network engineers, software developers, cybersecurity analysts, and IT infrastructure specialists for the company's operations in Toronto, Montreal, and Vancouver. The rapid pace of technological change in telecommunications, including the rollout of 5G networks and fiber-optic infrastructure, has created demand for specialized technical talent that Rogers has partially addressed through the TFWP.",
      employeeCount: "25,000+",
      founded: "1960",
      locations: [
        {
          city: "Toronto",
          province: "Ontario"
        },
        {
          city: "Brampton",
          province: "Ontario"
        },
        {
          city: "Montreal",
          province: "Quebec"
        },
        {
          city: "Vancouver",
          province: "British Columbia"
        },
      ],
      hiringHistory: [
        {
          position: "Network Engineer",
          location: "Toronto, ON",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Software Developer",
          location: "Brampton, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Cybersecurity Analyst",
          location: "Montreal, QC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "IT Infrastructure Specialist",
          location: "Vancouver, BC",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Senior Network Architect",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$120,000–$155,000"
        },
        {
          title: "RF Engineer",
          location: "Brampton, ON",
          type: "Full-time",
          salary: "$90,000–$115,000"
        },
        {
          title: "DevOps Engineer",
          location: "Montreal, QC",
          type: "Full-time",
          salary: "$95,000–$125,000"
        },
      ]
    },
    {
      slug: "cenovus-energy",
      name: "Cenovus Energy",
      industry: "Oil & Gas",
      province: "Alberta",
      city: "Calgary",
      website: "https://www.cenovus.com",
      careerPage: "https://www.cenovus.com/careers",
      description: "Integrated energy company headquartered in Calgary, Alberta, with major oil sands operations, refining capacity, and a focus on advancing environmental performance.",
      aiSummary: "Cenovus Energy Inc. is a Canadian integrated oil and natural gas company headquartered in Calgary, Alberta. Formed in 2009 as a spin-off from Encana Corporation, Cenovus has grown into one of Canada's largest oil producers through the development of its oil sands assets and the 2021 acquisition of Husky Energy. The company operates steam-assisted gravity drainage (SAGD) facilities at Christina Lake and Foster Creek in Northern Alberta, holds a 50% interest in two US refineries, and has offshore operations in the Atlantic region and Asia Pacific. Cenovus employs over 6,000 people.\n\nCenovus has utilized the Temporary Foreign Worker Program to fill specialized technical and trades roles for its oil sands operations in the Cold Lake and Wood Buffalo regions of Alberta. TFWP hiring has targeted process engineers, steam engineers, heavy equipment operators, and instrumentation technicians. The company's commitment to environmental performance has also driven demand for environmental engineers and emissions-reduction specialists, though TFWP usage has been concentrated on the operational roles essential to maintaining production at its SAGD facilities.",
      employeeCount: "6,000+",
      founded: "2009",
      locations: [
        {
          city: "Calgary",
          province: "Alberta"
        },
        {
          city: "Cold Lake",
          province: "Alberta"
        },
        {
          city: "Fort McMurray",
          province: "Alberta"
        },
        {
          city: "Lloydminster",
          province: "Saskatchewan"
        },
      ],
      hiringHistory: [
        {
          position: "Process Engineer",
          location: "Cold Lake, AB",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Heavy Equipment Operator",
          location: "Fort McMurray, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Instrumentation Technician",
          location: "Cold Lake, AB",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Steam Engineer",
          location: "Lloydminster, SK",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "SAGD Process Engineer",
          location: "Cold Lake, AB",
          type: "Full-time",
          salary: "$110,000–$145,000"
        },
        {
          title: "Production Operator",
          location: "Fort McMurray, AB",
          type: "Full-time",
          salary: "$70,000–$90,000"
        },
        {
          title: "Environmental Engineer",
          location: "Calgary, AB",
          type: "Full-time",
          salary: "$95,000–$125,000"
        },
      ]
    },
    {
      slug: "lululemon-athletica",
      name: "Lululemon Athletica",
      industry: "Retail",
      province: "British Columbia",
      city: "Vancouver",
      website: "https://www.lululemon.com",
      careerPage: "https://www.lululemon.com/en-ca/careers",
      description: "Global athletic apparel company headquartered in Vancouver, British Columbia, designing and selling technical athletic wear, footwear, and accessories worldwide.",
      aiSummary: "Lululemon Athletica Inc. is a Canadian technical athletic apparel company headquartered in Vancouver, British Columbia. Founded in 1998 by Chip Wilson, Lululemon started as a single store in Vancouver's Kitsilano neighborhood offering yoga-inspired athletic wear and has grown into a global brand with over 700 company-operated stores across 29 countries. The company designs and distributes athletic apparel, footwear, and accessories for activities including yoga, running, training, and most other sweaty pursuits. Lululemon employs over 30,000 people globally and has established itself as a leader in the premium athletic apparel market.\n\nLululemon has been a documented user of the Temporary Foreign Worker Program, primarily to fill specialized corporate roles at its Vancouver headquarters and select technical positions. TFWP hiring has focused on roles in technology, data science, supply chain management, and design — areas where the competitive global talent market for apparel brands has made domestic recruitment challenging. The company's rapid international growth and digital transformation have created demand for professionals with specialized e-commerce, logistics, and digital product experience that Lululemon has partially addressed through the TFWP.",
      employeeCount: "30,000+",
      founded: "1998",
      locations: [
        {
          city: "Vancouver",
          province: "British Columbia"
        },
        {
          city: "Toronto",
          province: "Ontario"
        },
        {
          city: "Burnaby",
          province: "British Columbia"
        },
      ],
      hiringHistory: [
        {
          position: "Data Scientist",
          location: "Vancouver, BC",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Supply Chain Analyst",
          location: "Vancouver, BC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "UX Designer",
          location: "Toronto, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Software Engineer",
          location: "Vancouver, BC",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Senior Software Engineer",
          location: "Vancouver, BC",
          type: "Full-time",
          salary: "$130,000–$170,000"
        },
        {
          title: "Digital Product Manager",
          location: "Vancouver, BC",
          type: "Full-time",
          salary: "$105,000–$140,000"
        },
        {
          title: "Global Supply Chain Planner",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$75,000–$95,000"
        },
      ]
    },
    {
      slug: "couche-tard",
      name: "Alimentation Couche-Tard",
      industry: "Retail",
      province: "Quebec",
      city: "Laval",
      website: "https://www.couche-tard.com",
      careerPage: "https://www.couche-tard.com/careers",
      description: "Global convenience store operator headquartered in Laval, Quebec, with over 14,000 stores worldwide under banners including Circle K, Couche-Tard, and Ingo.",
      aiSummary: "Alimentation Couche-Tard Inc. is a Canadian multinational convenience store operator headquartered in Laval, Quebec. Founded in 1980 with a single store in Laval, Couche-Tard has grown through aggressive acquisitions into a global leader in the convenience and fuel retail industry, operating over 14,000 stores across 25 countries and territories. The company's network includes well-known brands such as Circle K, Couche-Tard, and Ingo, and it employs more than 120,000 people worldwide. In Canada, Couche-Tard operates thousands of locations from coast to coast, making it one of the country's most visible retail brands.\n\nCouche-Tard has been a documented user of the Temporary Foreign Worker Program across its Canadian convenience store and fuel station network. TFWP hiring has targeted store managers, assistant managers, and customer service representatives for locations in regions facing acute labor shortages, particularly in Western Canada and rural Quebec. The 24/7 operating demands of the convenience retail industry and the challenge of recruiting in smaller communities have contributed to Couche-Tard's use of the TFWP to maintain staffing levels at its Canadian locations.",
      employeeCount: "120,000+",
      founded: "1980",
      locations: [
        {
          city: "Laval",
          province: "Quebec"
        },
        {
          city: "Montreal",
          province: "Quebec"
        },
        {
          city: "Calgary",
          province: "Alberta"
        },
        {
          city: "Toronto",
          province: "Ontario"
        },
      ],
      hiringHistory: [
        {
          position: "Store Manager",
          location: "Calgary, AB",
          year: 2025,
          status: "Approved"
        },
        {
          position: "Assistant Store Manager",
          location: "Montreal, QC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Customer Service Representative",
          location: "Toronto, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Food Service Supervisor",
          location: "Laval, QC",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Store Manager",
          location: "Calgary, AB",
          type: "Full-time",
          salary: "$48,000–$60,000"
        },
        {
          title: "District Manager",
          location: "Montreal, QC",
          type: "Full-time",
          salary: "$70,000–$90,000"
        },
        {
          title: "Fuel Station Attendant",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$34,000–$42,000"
        },
      ]
    },
    {
      slug: "air-canada",
      name: "Air Canada",
      industry: "Transportation",
      province: "Quebec",
      city: "Montreal",
      website: "https://www.aircanada.com",
      careerPage: "https://www.aircanada.com/ca/en/aco/home/careers.html",
      description: "Canada's largest airline and flag carrier, headquartered in Montreal, Quebec, operating scheduled passenger and cargo services to over 200 destinations worldwide.",
      aiSummary: "Air Canada is Canada's largest airline and flag carrier, headquartered in Montreal, Quebec. Founded in 1937 as Trans-Canada Air Lines, Air Canada has grown into one of the world's leading international airlines, serving over 200 destinations across six continents. The airline operates a fleet of more than 350 aircraft from its major hubs in Toronto, Montreal, and Vancouver, and is a founding member of the Star Alliance network. Air Canada employs over 35,000 people and carries approximately 45 million passengers annually, making it one of Canada's most iconic companies and a crucial driver of the country's tourism and business travel economy.\n\nAir Canada has been a significant and publicly documented user of the Temporary Foreign Worker Program, particularly for specialized aviation roles where domestic talent supply is limited. TFWP hiring at Air Canada has targeted aircraft maintenance engineers (AMEs), pilots, avionics technicians, and certain IT and operations roles at its major hubs. The global airline industry faces ongoing challenges in recruiting and training qualified pilots and maintenance personnel, and Air Canada has used the TFWP as one component of its workforce strategy to maintain operational capacity and support its fleet growth.",
      employeeCount: "35,000+",
      founded: "1937",
      locations: [
        {
          city: "Montreal",
          province: "Quebec"
        },
        {
          city: "Toronto",
          province: "Ontario"
        },
        {
          city: "Vancouver",
          province: "British Columbia"
        },
        {
          city: "Calgary",
          province: "Alberta"
        },
      ],
      hiringHistory: [
        {
          position: "Aircraft Maintenance Engineer",
          location: "Montreal, QC",
          year: 2025,
          status: "Approved"
        },
        {
          position: "First Officer",
          location: "Toronto, ON",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Avionics Technician",
          location: "Vancouver, BC",
          year: 2024,
          status: "Approved"
        },
        {
          position: "Flight Dispatcher",
          location: "Montreal, QC",
          year: 2023,
          status: "Completed"
        },
      ],
      openPositions: [
        {
          title: "Pilot — Boeing 777",
          location: "Toronto, ON",
          type: "Full-time",
          salary: "$180,000–$250,000"
        },
        {
          title: "Aircraft Mechanic",
          location: "Montreal, QC",
          type: "Full-time",
          salary: "$68,000–$88,000"
        },
        {
          title: "Cargo Operations Agent",
          location: "Vancouver, BC",
          type: "Full-time",
          salary: "$45,000–$55,000"
        },
      ]
    }
];

export const provinces = [
  "BC",
  "AB",
  "SK",
  "MB",
  "ON",
  "QC",
  "NB",
  "NS",
  "PE",
  "NL",
] as const;

export const industries = [
  "Food Processing",
  "Oil & Gas",
  "Technology",
  "Construction",
  "Agriculture",
  "Mining",
  "Manufacturing",
  "Transportation",
  "Retail",
  "Healthcare",
  "Hospitality",
  "Finance",
  "Telecommunications",
] as const;
