-- =============================================================================
-- SalonMenu.pk — Demo salon seed (generated from salons/data.json)
-- Run in Supabase SQL Editor AFTER mvp-schema.sql
-- Safe to re-run: deletes demo slugs then re-inserts
-- =============================================================================

delete from public.salons
where slug in ('noor', 'glamour', 'rose-beauty-parlour');

insert into public.business_tags (name, slug) values ('Ladies Only', 'ladies-only') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Bridal Expert', 'bridal-expert') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Home Service', 'home-service') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Parking', 'parking') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Unisex', 'unisex') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Premium Makeup', 'premium-makeup') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Nail Art', 'nail-art') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Card Payment', 'card-payment') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Makeup Artist', 'makeup-artist') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Hair Care', 'hair-care') on conflict (slug) do nothing;
insert into public.business_tags (name, slug) values ('Nail Studio', 'nail-studio') on conflict (slug) do nothing;

-- Noor Beauty Salon
insert into public.salons (
  slug, status, verification_status, name, tagline,
  city_id, city_name, area, address, phone, whatsapp,
  timings, weekly_off, brand_color, price_level, hero_image_url,
  stats_clients_label, stats_experience_label, stats_rating,
  is_featured, published_at
) values (
  'noor', 'published', 'verified',
  'Noor Beauty Salon', 'خوبصورتی آپ کا حق ہے',
  (select id from public.cities where slug = 'lahore'),
  'Lahore', 'Gulberg III', '12-A Main Blvd, Gulberg III, Lahore',
  '0300-1234567', '923001234567',
  'Mon-Sat: 10am - 8pm', 'Sunday',
  '#845051', '$$',
  '/assets/images/salons/noor-hero.jpeg',
  '500+', '8yr',
  4.9, true, now()
);

insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800', 0);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800', 1);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800', 2);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', 3);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800', 4);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=800', 5);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', 6);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800', 7);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800', 8);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', 9);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800', 10);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'noor'), 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=900', 11);
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'noor'), bt.id from public.business_tags bt where bt.slug = 'ladies-only';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'noor'), bt.id from public.business_tags bt where bt.slug = 'bridal-expert';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'noor'), bt.id from public.business_tags bt where bt.slug = 'home-service';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'noor'), bt.id from public.business_tags bt where bt.slug = 'parking';
insert into public.salon_social_links (salon_id, platform, url) values ((select id from public.salons where slug = 'noor'), 'instagram'::public.social_platform, 'https://instagram.com/noorbeautysalon')
on conflict (salon_id, platform) do update set url = excluded.url;
insert into public.salon_social_links (salon_id, platform, url) values ((select id from public.salons where slug = 'noor'), 'facebook'::public.social_platform, 'https://facebook.com/noorbeautysalon')
on conflict (salon_id, platform) do update set url = excluded.url;
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Facial', 'facial', 0);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Basic Facial', 'Deep cleansing and exfoliation for a fresh, glowing look.', '45 min', 1200, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'facial';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Gold Facial', 'A rich facial treatment for instant radiance.', '60 min', 2500, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'facial';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Hydra Facial', 'Hydrating facial for fresh, clean, plump skin.', '60 min', 4200, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'facial';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Hair', 'hair', 1);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Hair Cut & Style', 'Fresh cut with basic styling.', '30 min', 800, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'hair';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Hair Color Full', 'Full hair color with consultation.', '120 min', 4500, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'hair';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Keratin Treatment', 'Smoothing treatment for softer, straighter hair.', '180 min', 8000, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'hair';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Makeup', 'makeup', 2);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Party Makeup', 'Elegant party look with long-lasting finish.', '60 min', 3500, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'makeup';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Bridal Makeup', 'Complete bridal makeup with premium products.', '180 min', 18000, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'makeup';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Engagement Makeup', 'Soft glam engagement look.', '120 min', 12000, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'makeup';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Nails', 'nails', 3);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Basic Manicure', 'Classic nail cleanup and polish.', '30 min', 800, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'nails';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Gel Nails', 'Long-lasting gel nail finish.', '60 min', 2200, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'nails';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'noor'), sc.id, 'Pedicure', 'Relaxing foot care and polish.', '45 min', 1200, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'noor') and sc.slug = 'nails';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Bridal Glow Package', 9500, 12000, 'Best Value', 0);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Gold Facial', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Bridal Glow Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hair Styling', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Bridal Glow Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Party Makeup', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Bridal Glow Package';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Eid Ready Combo', 3000, 3800, 'Limited Offer', 1);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Basic Facial', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Eid Ready Combo';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Blow Dry', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Eid Ready Combo';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Basic Manicure', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Eid Ready Combo';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Hair Revival Package', 8200, 10000, 'Hair Care', 2);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hair Cut & Style', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Hair Revival Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Keratin Treatment', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Hair Revival Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Blow Dry', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Hair Revival Package';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'noor'), 'Nails & Glow Package', 2800, 3500, 'Self Care', 3);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Basic Manicure', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Nails & Glow Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Pedicure', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Nails & Glow Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Basic Facial', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'noor') and p.name = 'Nails & Glow Package';
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Ayesha Malik, DHA Lahore', 'Bridal makeup bilkul amazing tha. Sari family ne tarif ki.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Sana Tariq, Gulberg', 'Gold facial ke baad skin bohat fresh lag rahi thi.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Hina Baig, Model Town', 'Keratin treatment ne baalon ko smooth kar diya.', 4, false);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Maham R., Gulberg', 'Staff very polite tha aur service time par start hui.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Zainab Ali, Cantt', 'Party makeup natural aur long lasting tha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Iqra N., Johar Town', 'Manicure clean tha, polish finish bohat achi thi.', 4, false);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Rabia Sheikh, Garden Town', 'Salon ka environment neat aur comfortable hai.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Komal A., DHA', 'Hair color consultation helpful thi, result exactly waisa aya.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'noor'), 'Mina K., Liberty', 'Facial ke baad skin soft feel hui. Good value.', 4, false);

-- Glamour Studio
insert into public.salons (
  slug, status, verification_status, name, tagline,
  city_id, city_name, area, address, phone, whatsapp,
  timings, weekly_off, brand_color, price_level, hero_image_url,
  stats_clients_label, stats_experience_label, stats_rating,
  is_featured, published_at
) values (
  'glamour', 'published', 'verified',
  'Glamour Studio', 'جہاں حسن کھلتا ہے',
  (select id from public.cities where slug = 'karachi'),
  'Karachi', 'DHA Phase 5', 'Shop 7, DHA Phase 5, Karachi',
  '0321-9876543', '923219876543',
  'Tue-Sun: 11am - 9pm', 'Monday',
  '#7c5cbf', '$$$',
  '/assets/images/salons/glamour-hero.jpeg',
  '300+', '5yr',
  4.8, true, now()
);

insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800', 0);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800', 1);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800', 2);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', 3);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800', 4);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800', 5);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', 6);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800', 7);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800', 8);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=800', 9);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=900', 10);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'glamour'), 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&q=80&w=800', 11);
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'glamour'), bt.id from public.business_tags bt where bt.slug = 'unisex';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'glamour'), bt.id from public.business_tags bt where bt.slug = 'premium-makeup';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'glamour'), bt.id from public.business_tags bt where bt.slug = 'nail-art';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'glamour'), bt.id from public.business_tags bt where bt.slug = 'card-payment';
insert into public.salon_social_links (salon_id, platform, url) values ((select id from public.salons where slug = 'glamour'), 'instagram'::public.social_platform, 'https://instagram.com/glamourstudio')
on conflict (salon_id, platform) do update set url = excluded.url;
insert into public.salon_social_links (salon_id, platform, url) values ((select id from public.salons where slug = 'glamour'), 'tiktok'::public.social_platform, 'https://tiktok.com/@glamourstudio')
on conflict (salon_id, platform) do update set url = excluded.url;
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Facial', 'facial', 0);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Basic Facial', 'A relaxing facial to rejuvenate your skin.', '45 min', 1500, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'facial';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Hydra Facial', 'Hydrating facial for fresh, clean skin.', '60 min', 4000, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'facial';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Vitamin C Facial', 'Brightening facial for dull and tired skin.', '60 min', 3500, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'facial';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Hair', 'hair', 1);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Hair Cut', 'Modern haircut and shape.', '30 min', 1000, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'hair';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Balayage', 'Soft blended color for a premium look.', '150 min', 7000, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'hair';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Protein Treatment', 'Repair treatment for dry or damaged hair.', '90 min', 5200, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'hair';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Makeup', 'makeup', 2);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Party Makeup', 'Event-ready makeup with clean finish.', '60 min', 4000, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'makeup';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Bridal Makeup', 'Premium bridal makeup package.', '180 min', 22000, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'makeup';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Soft Glam Makeup', 'Natural glam for dinners, shoots, and events.', '75 min', 5500, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'makeup';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Nails', 'nails', 3);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Gel Nails', 'Glossy gel nails with long wear.', '60 min', 2500, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'nails';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Nail Extensions', 'Beautiful extensions with custom shape.', '90 min', 3500, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'nails';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'glamour'), sc.id, 'Luxury Pedicure', 'Relaxing pedicure with scrub, massage, and polish.', '60 min', 2200, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'glamour') and sc.slug = 'nails';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Party Ready Package', 6500, 8200, 'Popular', 0);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Party Makeup', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Party Ready Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Blow Dry', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Party Ready Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Gel Nails', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Party Ready Package';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Hair Color Refresh', 8500, 10000, 'New', 1);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Balayage', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Hair Color Refresh';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hair Wash', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Hair Color Refresh';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Blow Dry', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Hair Color Refresh';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Glow & Glam Package', 8500, 10200, 'Best Value', 2);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hydra Facial', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Glow & Glam Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Soft Glam Makeup', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Glow & Glam Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Luxury Pedicure', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Glow & Glam Package';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'glamour'), 'Nail Art Studio Package', 6200, 8200, 'Nails', 3);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Gel Nails', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Nail Art Studio Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Nail Extensions', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Nail Art Studio Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Luxury Pedicure', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'glamour') and p.name = 'Nail Art Studio Package';
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Ayesha K.', 'Best facial experience ever. Glow is unreal.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Sana M.', 'Very professional staff and clean environment.', 4, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Hira B.', 'Loved my new haircut. Highly recommended.', 5, false);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Fatima A.', 'Bridal trial was detailed and the artist listened carefully.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Maha F.', 'Balayage blend bohat soft aur premium laga.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Nida W.', 'Gel nails lasted longer than expected.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Rabia R.', 'Weekend par thora rush tha, but service quality excellent thi.', 4, false);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Komal S.', 'Soft glam makeup exactly meri reference photo jaisa tha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'glamour'), 'Laiba T.', 'Hydra facial relaxing tha aur staff friendly tha.', 4, false);

-- Rose Beauty Parlour
insert into public.salons (
  slug, status, verification_status, name, tagline,
  city_id, city_name, area, address, phone, whatsapp,
  timings, weekly_off, brand_color, price_level, hero_image_url,
  stats_clients_label, stats_experience_label, stats_rating,
  is_featured, published_at
) values (
  'rose-beauty-parlour', 'published', 'verified',
  'Rose Beauty Parlour', 'Where every look blooms',
  (select id from public.cities where slug = 'sahiwal'),
  'Sahiwal', '86/6R', '86/6R, Sahiwal',
  '0333-4567890', '923334567890',
  'Mon-Sat: 10am - 9pm', 'Sunday',
  '#9b4f63', '$$',
  '/assets/images/salons/rose-beauty-parlour-hero.jpeg',
  '250+', '6yr',
  4.7, true, now()
);

insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800', 0);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800', 1);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800', 2);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', 3);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800', 4);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=800', 5);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', 6);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800', 7);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800', 8);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', 9);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800', 10);
insert into public.salon_gallery_images (salon_id, image_url, sort_order) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=900', 11);
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'rose-beauty-parlour'), bt.id from public.business_tags bt where bt.slug = 'ladies-only';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'rose-beauty-parlour'), bt.id from public.business_tags bt where bt.slug = 'makeup-artist';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'rose-beauty-parlour'), bt.id from public.business_tags bt where bt.slug = 'hair-care';
insert into public.salon_tags (salon_id, tag_id)
select (select id from public.salons where slug = 'rose-beauty-parlour'), bt.id from public.business_tags bt where bt.slug = 'nail-studio';
insert into public.salon_social_links (salon_id, platform, url) values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'instagram'::public.social_platform, 'https://instagram.com/rosebeautyparlour')
on conflict (salon_id, platform) do update set url = excluded.url;
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Facial', 'facial', 0);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Basic Facial', 'Fresh cleansing facial for everyday glow.', '45 min', 1400, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'facial';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Gold Facial', 'Radiance facial for events and special days.', '60 min', 3000, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'facial';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Hydra Facial', 'Hydrating facial for clean and plump skin.', '60 min', 4500, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'facial';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Hair', 'hair', 1);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Hair Cut', 'Modern haircut with shape and styling.', '30 min', 900, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'hair';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Hair Color', 'Full hair color with consultation.', '120 min', 5200, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'hair';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Protein Treatment', 'Repair treatment for dry or damaged hair.', '90 min', 6000, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'hair';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Makeup', 'makeup', 2);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Party Makeup', 'Event-ready makeup with long-lasting finish.', '60 min', 3800, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'makeup';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Bridal Makeup', 'Complete premium bridal makeup.', '180 min', 19000, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'makeup';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Engagement Makeup', 'Soft glam look for engagement events.', '120 min', 13000, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'makeup';
insert into public.service_categories (salon_id, name, slug, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Nails', 'nails', 3);
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Basic Manicure', 'Classic nail cleanup and polish.', '30 min', 900, 0
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'nails';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Gel Nails', 'Long-lasting gel nail finish.', '60 min', 2400, 1
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'nails';
insert into public.services (salon_id, category_id, name, description, duration_label, price_pkr, sort_order)
select (select id from public.salons where slug = 'rose-beauty-parlour'), sc.id, 'Luxury Pedicure', 'Pedicure with scrub, massage, and polish.', '60 min', 2100, 2
from public.service_categories sc where sc.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and sc.slug = 'nails';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Rose Bridal Package', 16000, 20000, 'Bridal', 0);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Bridal Makeup', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Rose Bridal Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hair Styling', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Rose Bridal Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Gold Facial', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Rose Bridal Package';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Weekend Glow Combo', 6200, 7800, 'Popular', 1);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hydra Facial', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Weekend Glow Combo';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Blow Dry', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Weekend Glow Combo';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Gel Nails', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Weekend Glow Combo';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Hair Smooth Package', 7200, 9000, 'Hair Care', 2);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Hair Cut', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Hair Smooth Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Protein Treatment', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Hair Smooth Package';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Blow Dry', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Hair Smooth Package';
insert into public.packages (salon_id, name, price_pkr, original_price_pkr, promo_tag, sort_order)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Self Care Day', 4200, 5400, 'Self Care', 3);
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Basic Facial', 0 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Self Care Day';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Manicure', 1 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Self Care Day';
insert into public.package_items (package_id, label, sort_order)
select p.id, 'Luxury Pedicure', 2 from public.packages p
where p.salon_id = (select id from public.salons where slug = 'rose-beauty-parlour') and p.name = 'Self Care Day';
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Areeba S., 86/6R', 'Makeup bohat clean aur natural tha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Maham K., Farid Town', 'Staff friendly aur salon clean tha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Sadia R., Sahiwal Cantt', 'Hair treatment ke baad baal soft ho gaye.', 4, false);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Hina A., Harappa Road', 'Bridal look exactly reference jaisa tha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Nimra J., 86/6R', 'Gel nails ka finish bohat neat tha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Laiba M., Pak Town', 'Hydra facial relaxing aur effective tha.', 4, false);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Zara T., Sahiwal', 'Booking aur service dono smooth thay.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Mina P., Main Bazaar', 'Party makeup all night fresh raha.', 5, true);
insert into public.salon_reviews (salon_id, author_name, body, stars, is_verified)
values ((select id from public.salons where slug = 'rose-beauty-parlour'), 'Rabia N., Ghalla Mandi', 'Good value and professional team.', 4, false);

-- Verify
select slug, name, city_name, status from public.salons order by name;
