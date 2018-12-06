This is a quick demo of our project. It's a simple voting app where you can create a poll and share it with your friends so they can vote on it. So let's start by creating a poll.

You need to log in to create a poll. We use Facebook O Auth in order to authenticate users. So I'll just quickly log in with my email and password. After you log in, Facebook provides us with a user ID, name, email and profile picture. Let us make a quick poll. First we add a question. 'Where should I go on my next vacation?'. The poll takes a minimum of two options and a maximum of 4. Let's add Canada, Japan, Spain and Bolivia. Then we need to add how long we want the poll to be active.



Then we need to enter how many days we want the poll to be active. Let's go with thirty days. Do you want to show this poll on the feed? We will get to the feed in a moment. Do you want to display analytics on your poll? This basically calculates the running analytics on the poll so far and shows it on the poll options before voting. Let's go with yes on that. Hit 'create'.



Now we have the link where the poll is active. All the buttons allow sharing this poll on social platforms. You can also embed the poll within any website. Copy the provided code and enter it within your HTML to embed the poll. Let's try it out. Hit 'Save'. You have the poll running here.



So the timer goes on the top. The poll is active for 30 days from this point. These are the options. This is where the creator's profile picture goes. This is the tag.

It is decided by our custom trained NLP model hosted on Google's dialog flow. Let's just go with Japan on the poll. After you click on the button it gives you the running analytics.  Also, you can see more details on the poll here. What IP address voted at what time and what their choice was. Down here you get a timeline graph of the activity on the poll.



Another vertical of the app is the feed. Here you get the current polls that are active and have their feed privacy set to true. These are also sorted by the most activity and are tailored based on the current user's IP address. Let's vote on a few polls. "What is your favorite airline?". Let's go with Emirates. The polls can be filtered by tags. For example, food. "What is the best pizza chain?" "Dominoes".



Also, there's more info. You can go on your profile and see details like all the IP addresses you've logged in with. Then, there's a list of poll's a user has created.



Another feature we have is the platform statistics feature. These are all the current stats on our platform. We gather a bunch of data from the browsers, IP addresses, Facebook and the users themselves. These are the requests filtered by where they originated displayed on a map.



Another advanced feature we have is to allow voting without having to log in. To make sure that each vote is unique we use persistent browser storage. The project also implements VPN detection. Let's switch to a VPN. Connecting to Portugal...Now we are on a VPN. If we try to vote now, the project would detect the VPN and wouldn't allow voting. That's our project.  
