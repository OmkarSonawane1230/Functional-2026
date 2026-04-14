-- Create table for digital marketing data
CREATE TABLE IF NOT EXISTS marketing_campaigns (
    campaign_id STRING,
    ad_id STRING,
    keyword STRING,
    clicks INT,
    impressions INT,
    spend FLOAT,
    is_click INT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
TBLPROPERTIES ("skip.header.line.count"="1");

-- Load data into the table
LOAD DATA LOCAL INPATH 'marketing_data.csv' INTO TABLE marketing_campaigns;

-- Perform simple analytics: Total clicks and spend per campaign
SELECT campaign_id, SUM(clicks) AS total_clicks, SUM(spend) AS total_spend
FROM marketing_campaigns
GROUP BY campaign_id;
