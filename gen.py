import random
from datetime import datetime, timedelta
import random

def random_date_within_last_30_days():
    today = datetime.now()
    random_number_of_days = random.randint(0, 29)  # 0 to 29 to include the possibility of today
    random_date = today - timedelta(days=random_number_of_days)
    return random_date.strftime('%Y-%m-%d')  # Formatting the date as a string in 'YYYY-MM-DD' format


# Adjusting the function to generate 100 war attack records fitting the given constraints
def generate_war_attacks_for_constraints(player_ids, war_ids, clan_id):
    attacks = []
    for war_id in war_ids:
        for player_id in player_ids:
            num_attacks = random.randint(1, 2)  # Random number of attacks between 1 and 2
            stars_max = 3 * num_attacks
            percentage_max = 100 * num_attacks
            attack = {
                "war_id": war_id,
                "player_id": player_id,
                "clan_id": clan_id,
                "num_attack": num_attacks,
                "war_type": "REG",
                "stars": random.randint(0, stars_max),
                "percentage": random.randint(0, percentage_max),
                "date": random_date_within_last_30_days()
            }
            attacks.append(attack)
    return attacks

# Generate 100 war attacks fitting the constraints
player_ids = player_ids = [
    "#03382192", "#15223956", "#24034391", "#24858372", "#27391448",
    "#40512598", "#47156482", "#54679832", "#57581527", "#66197831",
    "#71966345", "#72808360", "#82743904", "#83852131", "#86685319",
    "#86777756", "#87948122", "#90621752", "#94876405", "#95460423"
]
war_ids = ['#92595643', '#30803442', '#46355959']
clan_id = '#46058046'

war_attacks_100 = generate_war_attacks_for_constraints(player_ids, war_ids, clan_id)

# Generate SQL INSERT statements for the generated war attacks
insert_statements_100 = []
for attack in war_attacks_100:
    statement = f"INSERT INTO war_attacks (_id, player_id, clan_id, num_attack, war_type, stars, percentage, date) VALUES ('{attack['war_id']}', '{attack['player_id']}', '{attack['clan_id']}', {attack['num_attack']}, '{attack['war_type']}', {attack['stars']}, {attack['percentage']}, '{attack['date']}');"
    insert_statements_100.append(statement)

for s in insert_statements_100:
    print(s)


