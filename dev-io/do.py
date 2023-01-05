import json

work_list = {}

def add_work(work, context):
    for ctx in context:
        print(f'ctx {ctx} work {work}')
        if ctx not in work_list:
            work_list[ctx] = []
        work_list[ctx].append(work)

# Make habit        
add_work("Meditate one second", 
         ["Always"]) 
add_work("Smile", 
         ["Always"]) 
add_work("Meditate two second", 
         ["Always"]) 
add_work("Smile hard", 
         ["Always"]) 
add_work("Do relax", 
         ["Always"]) 
add_work("Think about howto automate myself", 
         ["Always"])
add_work("Take a deep breath", 
         ["Always"])
add_work("Do daydream", 
         ["Always"])
add_work("Buy one stock", 
         ["Always"])

add_work("Drink something", 
         ["Home", "Work"])

add_work("Do one squat", 
         ["Home"])  
add_work("Do flank one second", 
         ["Home"])  
add_work("Give tension to belly", 
         ["Home"])  
add_work("Try drop heartbeat rate", 
         ["Always"])  
add_work("Do stretch once", 
         ["Home", "Work"])
add_work("Look at the checklist that you should do right now", 
         ["Home", "Transit", ])

# Programming
add_work("Look one github issues", 
         ["Home", "Transit", ])
add_work("Write one line of code",
         ["Home", ])
add_work("Write one line of c/cpp code",
         ["Home", ])
add_work("Write one issue",
         ["Home", ])
add_work("Write one line of comment",
         ["Home", "Transit", ])
add_work("Check your repositories",
         ["Home", "Transit", ])
add_work("Open your git main profile",
         ["Home", "Transit", ])
add_work("Check your git io main page",
         ["Home", "Transit", ])
add_work("Check git readlist", 
         ["Home", "Transit", ])
add_work("Check git issues", 
         ["Home", "Transit", ])
add_work("Update random readme.md", 
         ["Home", "Transit", ])

# Create
add_work("Write one line of novel", 
         ["Home", "Transit", ])
add_work("Think about what to write", 
         ["Home", "Transit", ])
add_work("Draw one stroke",
         ["Home", ])
add_work("Pick pencil",
         ["Home", ])

# Housework
add_work("Check random storage of your room", 
         ["Home", "Housework"])
add_work("Make bed", 
         ["Home", "Housework"])
add_work("Fold one laundry", 
         ["Home", "Housework", ]) 
add_work("Throw out garbage outside", 
         ["Home", "Housework", ])
add_work("Pick up one trash and throw to trash bin", 
         ["Home", "Housework", ])
add_work("Get one piece of watered tissue and rub something", 
         ["Home", "Housework", ])
add_work("Pick one laundry and put in washer", 
         ["Home", "Housework", ])
add_work("Clean toilet", 
         ["Home", "Housework", ])
add_work("Put one thing back where it was", 
         ["Home", "Housework", ])
add_work("Turn on the hot water in the sink", 
         ["Home", "Housework", ])
add_work("Put one food garbage to trashbag", 
         ["Home", "Housework", ])
add_work("Throw out one big garbage", 
         ["Home", "Housework", ])
add_work("Pick Vaccum Cleaner", 
         ["Home", "Housework", ])
add_work("Put on one sock", 
         ["Home", "Housework", ])

# Think
add_work("Think about work to add at this list", 
         ["Home", "Transit", "Work" ])

# Ignite
add_work("Turn on hot water at shower room",
         ["Home", ])
add_work("View thinktree", 
         ["Home", "Transit", ])

# Play
add_work("View chimhaha", 
         ["Home", "Transit"]) 
add_work("Lie down to bed", 
         ["Home", ]) 
add_work("Turn on the music", 
         ["Home", "Transit"])
add_work("Turn on Starcraft to beat computer", 
         ["Home"])
add_work("Turn on Starcraft", 
         ["Home"])
add_work("Turn on novel viewer", 
         ["Home", "Transit", ])
add_work("Turn on random video on youtube", 
         ["Home"])

# Misc
add_work("Charge a phone", 
         ["Home", ])


# Misc study
add_work("Turn on japanese vocabulary app", 
         ["Home", "Transit", ])
add_work("Write one kanji", 
         ["Home", "Transit", ])
# Human
add_work("Make some small message to somebody", 
         ["Home", "Transit", ])

# Talk
add_work("Talk about weather",  
         ["Talk"])
add_work("Talk about news", 
         ["Talk"])
add_work("Talk about work", 
         ["Talk"])


print(work_list)

for k, v in work_list.items():
    print(f'key {k} val {v}')
    with open(f"static/{k}.json", "w") as f:
        f.write(json.dumps(v, indent=4))