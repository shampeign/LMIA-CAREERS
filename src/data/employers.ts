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
] as const;
