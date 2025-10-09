-- Insert all blogs from blog1.txt into blogs table
-- Comprehensive script for 8 blog entries

-- Blog 1: Hidden Gems of the Swiss Alps
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Hidden Gems of the Swiss Alps: Beyond the Tourist Trail',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2980&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2980&q=80',
    JSON_ARRAY('Switzerland', 'Alps', 'Hidden Gems', 'Adventure', 'Hiking'),
    JSON_ARRAY('Discover secluded alpine villages and untouched mountain trails that offer authentic Swiss experiences away from the crowds.'),
    'The Swiss Alps are renowned worldwide for their dramatic peaks and pristine beauty, but beyond the well-trodden tourist paths lie hidden treasures that offer a more intimate connection with this alpine wonderland.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Lauterbrunnen\'s Secret Waterfalls', 'content', 'While most visitors flock to the famous Staubbach Falls, venture deeper into the valley to discover the hidden Trümmelbach Falls - a series of ten glacier-fed waterfalls inside the mountain itself. The thunderous cascade carries over 20,000 liters of water per second during peak season, creating an otherworldly experience as you walk through illuminated tunnels carved into the rock.'),
        JSON_OBJECT('title', 'Authentic Alpine Villages', 'content', 'Skip crowded Zermatt and head to Saas-Fee, a car-free village surrounded by thirteen peaks over 4,000 meters. Here, traditional chalets line cobblestone streets, and locals still practice centuries-old farming traditions. The village maintains its authentic character while offering modern amenities and direct access to pristine hiking trails.'),
        JSON_OBJECT('title', 'Culinary Adventures Off the Beaten Path', 'content', 'True Swiss cuisine extends far beyond fondue and chocolate. In remote mountain huts, try Älplermagronen - a hearty dish of pasta, potatoes, cheese, and caramelized onions that sustained Alpine farmers for generations. Pair it with fresh buttermilk and enjoy stunning views that no restaurant in the city can match.'),
        JSON_OBJECT('title', 'Planning Your Hidden Alps Adventure', 'content', 'The best time to explore these hidden gems is during late spring through early autumn when mountain paths are accessible. Consider staying in family-run guesthouses rather than large hotels - you\'ll experience genuine Swiss hospitality and often enjoy home-cooked meals made from local ingredients. Remember to respect the pristine environment that makes these places special. Follow Leave No Trace principles, stay on marked trails, and support local businesses to ensure these hidden gems remain unspoiled for future generations.')
    ),
    'Europe', 'Switzerland', NULL, 'Elena Martinez', 'Alpine specialist and adventure travel writer with over 10 years exploring Europe\'s mountain ranges.', '8 minutes', TRUE, '2024-03-15 00:00:00', NOW(), NOW()
);

-- Blog 2: Digital Nomad Paradise: Working from Bali's Hidden Spots
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Digital Nomad Paradise: Working from Bali\'s Hidden Spots',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2980&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2980&q=80',
    JSON_ARRAY('Bali', 'Indonesia', 'Productivity'),
    JSON_ARRAY('Discover Bali\'s best-kept secrets for remote work, from quiet cafes with reliable WiFi to co-working spaces in rice paddies.'),
    'Bali has become synonymous with digital nomad culture, but the well-known spots in Canggu and Ubud are often overcrowded and overpriced. True productivity and inspiration await in lesser-known areas where you can work surrounded by authentic Balinese culture.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Sidemen: Valley of Tranquility', 'content', 'This hidden valley in east Bali offers stunning rice terrace views and a growing community of remote workers. Several cafes now offer reliable high-speed internet, and the cooler mountain climate provides relief from coastal humidity. Work from terraced cafes overlooking Mount Agung while enjoying some of the island\'s best coffee.'),
        JSON_OBJECT('title', 'Munduk: Mountain Office with a View', 'content', 'Located in Bali\'s northern mountains, Munduk provides a peaceful alternative to beach-based coworking. The area features numerous waterfalls, spice plantations, and cafes with panoramic views. Internet speeds have improved significantly with recent infrastructure upgrades, making it viable for video calls and collaborative work.'),
        JSON_OBJECT('title', 'Essential Remote Work Setup', 'content', 'Invest in a local SIM card with unlimited data as backup for cafe WiFi. Many accommodations now offer dedicated work spaces, but a portable laptop stand and external keyboard can transform any table into an ergonomic workspace. Power outlets can be scarce, so carry a high-capacity power bank.'),
        JSON_OBJECT('title', 'Balancing Work and Island Life', 'content', 'Establish boundaries between work time and exploration. Many successful nomads work early mornings when WiFi is fastest and crowds are minimal, leaving afternoons free for beach time, temple visits, or sunset viewings. The key is finding rhythm that honors both productivity and the island\'s leisurely pace.'),
        JSON_OBJECT('title', 'Building Community', 'content', 'Join local nomad Facebook groups and attend weekly meetups. Bali\'s nomad community is welcoming and collaborative, often leading to business partnerships and lasting friendships. Don\'t miss the monthly full moon gatherings where nomads from across the island share experiences and opportunities.')
    ),
    'Asia', 'Indonesia', NULL, 'Alex Kim', 'Digital marketing consultant and location-independent entrepreneur with 5 years of remote work experience across Southeast Asia.', '6 minutes', TRUE, '2024-02-28 00:00:00', NOW(), NOW()
);

-- Blog 3: Food Lover's Guide to Vietnamese Street Food
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Food Lover\'s Guide to Vietnamese Street Food',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758647072/b82b4bcd-8d6b-450a-b155-b4aaa058070a.png',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758646833/Gemini_Generated_Image_6fp6v56fp6v56fp6_flqtkl.png',
    JSON_ARRAY('Vietnam', 'Cultural Experience', 'Food and culture'),
    JSON_ARRAY('Navigate Vietnam\'s incredible street food scene with insider tips on the best dishes, where to find them, and how to eat safely.'),
    'Vietnam street food culture represents the heart and soul of the country\'s culinary identity. From bustling Hanoi corners to quiet Mekong Delta towns, street vendors create magic with simple ingredients, generations-old recipes, and techniques passed down through families.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Must-Try Dishes by Region', 'content', 'In Hanoi, start your day with Pho Bo at a sidewalk stall where locals crowd around tiny plastic stools. The broth should be clear and aromatic, simmered for hours with charred onions and ginger. Move south to Ho Chi Minh City for Banh Mi - crusty French baguettes filled with pate, Vietnamese cold cuts, and fresh herbs that create perfect flavor balance.'),
        JSON_OBJECT('title', 'Reading the Signs of Quality', 'content', 'The best street food stalls often look the most unassuming. Look for high turnover - rapid ingredient replacement means freshness. Watch for vendors who specialize in one or two dishes rather than extensive menus. If locals are eating there, especially families with children, it\'s usually a good sign of both quality and safety.'),
        JSON_OBJECT('title', 'Street Food Etiquette', 'content', 'Embrace the communal aspect - sharing tables with strangers is normal and often leads to recommendations for other great spots. Order by pointing if language is a barrier, but learning basic Vietnamese food terms enhances the experience. Always finish your meal completely - leaving food is considered wasteful and disrespectful.'),
        JSON_OBJECT('title', 'Safety and Health Considerations', 'content', 'Choose stalls where food is cooked to order in front of you rather than pre-prepared items sitting out. Hot, freshly cooked food is generally safe, while raw vegetables and unpeeled fruits should be approached with caution. Stick to bottled or boiled water, and consider bringing your own chopsticks if you have a sensitive stomach.'),
        JSON_OBJECT('title', 'Beyond the Famous Dishes', 'content', 'Venture beyond Pho and Banh Mi to discover regional specialties like Cao Lau in Hoi An (noodles made with water from specific local wells) or Bun Bo Hue in central Vietnam (spicy beef noodle soup). Each region takes pride in unique dishes that reflect local ingredients and cultural influences.')
    ),
    'Asia', 'Vietnam', NULL, 'Linh Nguyen', 'Vietnamese-American food writer and cultural guide specializing in authentic Southeast Asian culinary experiences.', '15 minutes', TRUE, '2024-02-07 00:00:00', NOW(), NOW()
);

-- Blog 4: Sustainable Travel: How to Explore the World Responsibly
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Sustainable Travel: How to Explore the World Responsibly',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758648141/40552877-4e50-4c58-8220-0b6410fc019a.png',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758648220/4c0cee05-754c-4c0f-9dfa-3c1dbbc21aa5.png',
    JSON_ARRAY('Sustainable travel', 'Eco-tourism', 'Environment', 'Local Communities'),
    JSON_ARRAY('A comprehensive guide to reducing your environmental impact while traveling, from choosing eco-friendly accommodations to supporting local communities.'),
    'As travelers, we have the power to make a positive impact on the destinations we visit. Sustainable travel isn\'t about sacrificing comfort or experiences – it\'s about making conscious choices that benefit local communities and preserve the natural beauty we come to admire.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Choosing Sustainable Accommodations', 'content', 'Look for hotels and lodges with genuine sustainability certifications like Green Key or LEED. These properties often feature renewable energy systems, water conservation programs, and locally-sourced materials. Even better, consider staying in locally-owned guesthouses where your money directly supports community members.'),
        JSON_OBJECT('title', 'Transportation Choices That Matter', 'content', 'Transportation typically accounts for the largest portion of a trip\'s carbon footprint. When possible, choose direct flights and pack light to reduce fuel consumption. Once at your destination, prioritize walking, cycling, or public transportation. In many cities, these options provide more authentic cultural experiences than taxi rides.'),
        JSON_OBJECT('title', 'Supporting Local Economies', 'content', 'Eat at locally-owned restaurants, shop at neighborhood markets, and choose tour operators run by community members. This not only provides more authentic experiences but ensures your tourism dollars benefit the people who call your destination home. Learn a few phrases in the local language – it shows respect and often leads to warmer interactions.'),
        JSON_OBJECT('title', 'Respecting Natural Environments', 'content', 'Whether exploring coral reefs, hiking mountain trails, or visiting wildlife reserves, remember that you\'re a guest in these environments. Maintain appropriate distances from wildlife, never remove natural souvenirs like shells or rocks, and always stay on designated paths to prevent erosion and protect fragile ecosystems.'),
        JSON_OBJECT('title', 'Making a Lasting Impact', 'content', 'Consider extending your stay rather than cramming multiple destinations into a short trip. Longer stays allow for deeper cultural connections, reduce transportation emissions, and often prove more economical. You\'ll return home with richer memories and a smaller environmental footprint.')
    ),
    'Global', 'All', NULL, 'David Chen', 'Environmental scientist and sustainable tourism advocate with expertise in eco-friendly travel practices.', '6 minutes', TRUE, '2024-03-10 00:00:00', NOW(), NOW()
);

-- Blog 5: Photography Guide: Capturing the Northern Lights in Iceland
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Photography Guide: Capturing the Northern Lights in Iceland',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758648423/022ac1d3-8859-4736-b33d-d63daf6557d8.png',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758648486/22a79090-169a-4ac4-b44b-c3b70c9473d1.png',
    JSON_ARRAY('Iceland', 'Northern lights', 'Aurora', 'Winter travel', 'Solo travel'),
    JSON_ARRAY('Master the art of aurora photography with expert tips on camera settings, locations, and timing for the perfect shot in Iceland.'),
    'Capturing the Northern Lights requires patience, preparation, and understanding both the technical aspects of photography and the natural phenomena itself. Iceland offers some of the world\'s best aurora viewing opportunities, but success depends on more than just being in the right place.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Understanding Aurora Activity', 'content', 'The aurora is caused by solar particles interacting with Earth\'s magnetic field. Monitor the KP index (geomagnetic activity scale) – levels of 3 or higher often produce visible aurora in Iceland. Apps like Aurora Forecast provide real-time predictions and cloud cover maps essential for planning your shoot.'),
        JSON_OBJECT('title', 'Camera Settings for Success', 'content', 'Use manual mode with these starting settings: ISO 1600-3200, aperture f/2.8 or wider, shutter speed 10-20 seconds. A sturdy tripod is essential – any camera movement will blur the aurora. Focus manually on infinity or use live view to focus on a bright star. Take test shots and adjust ISO to balance brightness with noise levels.'),
        JSON_OBJECT('title', 'Prime Locations in Iceland', 'content', 'Jökulsárlón Glacier Lagoon offers dramatic foreground icebergs reflecting aurora colors. The Seljalandsfoss waterfall area provides open skies away from Reykjavik\'s light pollution. For easier access, drive along Route 1 and stop at any dark area with clear northern views – some of the best shots come from unexpected roadside locations.'),
        JSON_OBJECT('title', 'Composition and Creativity', 'content', 'Include interesting foregrounds like volcanic rocks, waterfalls, or traditional Icelandic churches to add context and scale to your aurora images. The aurora often appears green to cameras even when it looks gray to the naked eye, so don\'t be discouraged if the display seems faint visually.'),
        JSON_OBJECT('title', 'Staying Warm and Safe', 'content', 'Icelandic winter nights are brutally cold, and batteries drain quickly in freezing temperatures. Bring hand warmers, spare batteries kept warm in inside pockets, and dress in layers. Always inform someone of your photography plans and carry emergency supplies – the aurora waits for no one, but safety comes first.')
    ),
    'Europe', 'Iceland', NULL, 'Sofia Lindberg', 'Professional landscape photographer specializing in Arctic conditions and aurora photography with published work in National Geographic.', '9 minutes', TRUE, '2024-02-20 00:00:00', NOW(), NOW()
);

-- Blog 6: Solo Female Travel: Empowering Adventures in Morocco
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Solo Female Travel: Empowering Adventures in Morocco',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758648593/22ad3a3f-49dd-49fc-bdd3-b817a8bbd20d.png',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758648669/3dba9b2e-6d42-43ca-a1e2-7d01e01dcf6c.png',
    JSON_ARRAY('Morocco', 'Solo Female Travel', 'Safety', 'Cultural experience', 'Empowerment'),
    JSON_ARRAY('Practical advice and inspiring stories for women traveling alone in Morocco, including safety tips and cultural insights.'),
    'Morocco offers solo female travelers an opportunity to experience rich culture, stunning landscapes, and warm hospitality. While some challenges exist, millions of women successfully explore Morocco independently each year, returning with life-changing experiences and newfound confidence.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Preparation and Mindset', 'content', 'Research cultural norms before arriving – understanding appropriate dress and behavior helps you blend in and show respect. Pack modest clothing that covers shoulders and knees, especially for visiting religious sites. Learning basic Arabic or French phrases demonstrates respect and often leads to warmer interactions with locals.'),
        JSON_OBJECT('title', 'Navigation and Transportation', 'content', 'The train system between major cities is modern, safe, and comfortable – choose first-class compartments for added security and comfort. For shorter distances, grand taxis (shared taxis) are generally safe when full of passengers. In cities, stick to official taxis with meters or use ride-sharing apps where available.'),
        JSON_OBJECT('title', 'Accommodation Strategies', 'content', 'Choose riads (traditional houses) in medina centers for authentic experiences, but research thoroughly and read recent reviews. Many riads offer airport transfers and guided medina tours – valuable services for first-time visitors. Consider staying in guesthouses run by women, which often provide additional cultural insights and support.'),
        JSON_OBJECT('title', 'Building Confidence and Connections', 'content', 'Join cooking classes, pottery workshops, or hammam experiences – these activities provide natural opportunities to meet other travelers and locals in structured, safe environments. Many Moroccan women are eager to share their culture with respectful visitors, leading to memorable exchanges and lasting friendships.'),
        JSON_OBJECT('title', 'Handling Challenges', 'content', 'Persistent vendors and unwanted attention are common but manageable with firm politeness and confident body language. Learn to say "La, shukran" (No, thank you) firmly and keep walking. Trust your instincts – if a situation feels uncomfortable, remove yourself immediately. Most Moroccans are genuinely helpful and protective of visitors to their country.')
    ),
    'Africa', 'Morocco', NULL, 'Fatima Al-Rashid', 'Travel safety expert and women\'s empowerment advocate with extensive experience in North Africa and Middle East travel.', '8 minutes', TRUE, '2024-02-20 00:00:00', NOW(), NOW()
);

-- Blog 7: Monsoon Magic: Best Time to Visit India's Hill Stations
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Monsoon Magic: Best Time to Visit India\'s Hill Stations',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758650105/abb30244-548a-49fe-9196-c4a42159f271.png',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758650153/8db1f4ac-bceb-4792-90df-a97ce1b2bfcd.png',
    JSON_ARRAY('India', 'Monsoon', 'Hill Station', 'Seasonal travel'),
    JSON_ARRAY('Experience India\'s hill stations during monsoon season for lush landscapes, fewer crowds, and unforgettable cultural experiences.'),
    'While most travelers avoid India during monsoon season, those in the know understand that this is when the country\'s hill stations transform into emerald paradises. The monsoon months of June through September offer a completely different perspective on India\'s mountainous regions.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Munnar\'s Tea Garden Paradise', 'content', 'Kerala\'s Munnar becomes even more magical during monsoon season. The endless tea plantations turn an impossibly vibrant green, and waterfalls cascade down every hillside. Morning mist creates an ethereal atmosphere as tea pickers work the slopes in traditional saris, their colorful clothing providing striking contrast against the verdant landscape.'),
        JSON_OBJECT('title', 'Coorg: India\'s Scotland', 'content', 'Known as the Scotland of India, Coorg (Kodagu) reaches peak beauty during the monsoon. Coffee plantations flourish under the consistent rainfall, filling the air with rich aromas. Stay in a heritage homestay where Kodava families share their unique culture, including traditional hunting stories and the famous Pandi curry made with local pork.'),
        JSON_OBJECT('title', 'Embracing the Rain', 'content', 'Don\'t fight the rain – embrace it! Pack quality rain gear and waterproof bags for your electronics. Many hill stations offer covered viewpoints and cozy cafes where you can watch dramatic thunderstorms roll across valleys. The sound of rain on tin roofs becomes a soothing soundtrack to your mountain retreat.'),
        JSON_OBJECT('title', 'Cultural Immersion During Monsoon', 'content', 'Monsoon season offers unique cultural opportunities as locals celebrate festivals tied to the rains. Witness traditional rain ceremonies, enjoy seasonal delicacies made from monsoon harvest, and experience the warm hospitality that Indians extend to brave travelers who visit during the "off-season."'),
        JSON_OBJECT('title', 'Practical Monsoon Travel Tips', 'content', 'Book accommodations with good drainage and elevation to avoid flooding. Roads can be challenging, so allow extra travel time and consider hiring local drivers familiar with monsoon conditions. Most importantly, maintain flexibility in your itinerary – sometimes the best experiences come from weather-induced plan changes.')
    ),
    'Asia', 'India', NULL, 'Priya Sharma', 'India travel specialist with deep knowledge of regional seasons and cultural traditions across the subcontinent.', '7 minutes', TRUE, '2024-03-05 00:00:00', NOW(), NOW()
);

-- Blog 8: Budget Backpacking: Southeast Asia on $30 a Day
INSERT INTO blogs (
    id, title, featured_media, hero_media, tags, tagline, excerpt, content, region, country, city, author_name, about_author, read_time, active, published_at, created_at, updated_at
) VALUES (
    UUID(),
    'Budget Backpacking: Southeast Asia on $30 a Day',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758650701/09630d7a-a567-4be7-9050-f31648641e3e.png',
    'https://res.cloudinary.com/dm59i8qed/image/upload/v1758650629/1daaa0b2-aa03-4707-8e28-8e10deb9393c.png',
    JSON_ARRAY('Southeast Asia', 'Budget Travel', 'Backpacking', 'Budget Tips'),
    JSON_ARRAY('Comprehensive guide to exploring Southeast Asia on a shoestring budget without sacrificing safety or unforgettable experiences.'),
    'Southeast Asia remains one of the world\'s most budget-friendly travel destinations, where $30 daily can provide accommodation, meals, transportation, and activities when you know how to allocate resources wisely. The key is understanding local pricing and making strategic choices about where to spend and where to save.',
    JSON_ARRAY(
        JSON_OBJECT('title', 'Accommodation: $5-8 Daily', 'content', 'Hostels in Thailand, Vietnam, and Cambodia offer dorm beds for $3-6 nightly, often including breakfast and WiFi. Choose hostels with security lockers, good reviews for cleanliness, and social common areas for meeting fellow travelers. In smaller towns, guesthouses often provide private rooms for similar prices to dorm beds in major cities.'),
        JSON_OBJECT('title', 'Food: $8-12 Daily', 'content', 'Street food and local restaurants offer incredible meals for $1-3 each. Avoid tourist-oriented restaurants near major attractions where prices can be 300% higher. Markets provide fresh fruit, snacks, and ingredients for simple meals if your accommodation has kitchen access. Splurge occasionally on special dishes but maintain discipline with daily food budgets.'),
        JSON_OBJECT('title', 'Transportation: $5-8 Daily', 'content', 'Local buses and trains cost fraction of tourist-oriented transport. Overnight buses save accommodation costs while covering long distances. Motorbike rentals ($3-5 daily) provide freedom to explore at your own pace but require international driving permits and quality helmets for safety.'),
        JSON_OBJECT('title', 'Activities and Experiences: $7-10 Daily', 'content', 'Many of Southeast Asia\'s best experiences are free or low-cost: temple visits, beach time, hiking trails, and cultural festivals. When choosing paid activities, book directly with operators rather than through tour agencies that add commission. Group tours often provide better value than private arrangements.'),
        JSON_OBJECT('title', 'Money-Saving Strategies', 'content', 'Travel during shoulder seasons for lower accommodation prices and fewer crowds. Stay longer in each destination to qualify for weekly discounts and reduce transportation costs. Connect with other backpackers to share costs for private transportation and group activities. Always negotiate politely - many prices are flexible, especially for longer stays.')
    ),
    'Asia', 'Southeast Asia', NULL, 'Jake Thompson', 'Budget travel expert and author of \'Broke Backpacker\'s Guide to Asia\' with 3 years of continuous travel experience in Southeast Asia.', '7 minutes', TRUE, '2024-03-05 00:00:00', NOW(), NOW()
);
