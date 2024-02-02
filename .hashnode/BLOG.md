WELL. After 3 days of endless headaches, 50+ failed Github action runs, unnecessary releases i am finally ready to make my submission. This blog is going to be a walk through of ideation, process and working of my project submission and most importantly of all, the lessons learnt.

![some image i downloaded from discord](./toshi0210_58640_Paintshop_H_logo_H_LOGO_Windows_Vista_style_Kaz_dcd1e773-0ece-4916-967d-8a6c357a5605.png)

## Ideation

I became aware of Hashnode`s API hackathon on twitter or X :) when i saw someones post on how they were building their project. I have participated in hackathons before so i was obviously interested. Signed up for a hashnode account and registered, it was at least a week 2 days remaining till submission day.

Anyway me and my procrastination i never got started until 3 days ago. 4 days remaining i though i had all the time in the world. I started plotting ideas 🎨. So what should i build? I had a lot of ideas as always. I had used Graphqueel (in prime's voice) in the past but that was like part of a course i did on Linked in Learning like 2 years ago so i knew the technical debt here was huge.

I didn't have a lot of time so i had to come up with a project that i could complete early enough to test for at least a day.

I even tried asking chatGPT to come up with ideas but the damn thing came up with wild ideas that even it could not implement. Right in the thick of it as i was rereading the hackathon reqs, i realized that in my haste i had not seen that hashnode itself had project ideas right on the site. I quickly chose one that would be most beneficial for me i.e fast to build, and at the end i want to feel like i learnt something even if i don`t win.

I chose **A GitHub action that publishes a blog post on every commit** because it fitted my criteria. I had copy pasted github actions into my workflows before but i had never really understood how they worked let alone create my own reusable one that would be published on Github marketplace.

## Building

To build this i had to learn GraphQL fast. Well i am a fast learner and was not entirely blank on the thing. So i quickly searched GraphQL on youtube and clicked on [fireship's 100 seconds OF GraphQL video](https://www.youtube.com/watch?v=eIQh02xuVw4&pp=ygUHZ3JhcGhxbA%3D%3D). That was enough to jog my memory but i needed something longer that would really get me going. I watched [Web Dev Simplified's 33 minute video](https://www.youtube.com/watch?v=ZQL7tL2S0oQ&pp=ygUHZ3JhcGhxbA%3D%3D) on the same. Well the video was fine but it taught mostly how to build graphql APIs rather than how to consume them. I however had now a better understanding.

After somemore research and playing with the [Hashnode API playground](https://gql.hashnode.com/) i finally felt like i had enough understanding. So i quickly wrote my "first" query to fetch a publication and run it on my local machine and it worked.

I felt quite nice about myself. I didn't know that the hard part was coming. Remember at this point i didn't know how a github action is to be created. Now i have this open source project i maintain called [react daraja](https://github.com/amosmachora/react-daraja) my plan was to see if the existing actions could deploy a blog to hashnode on push to a test branch. That was when all hell broke loose. I bundle my project using plugins like changesets and tsup. I don`t push node modules to github..

My Graphquuueel code obviously makes post and Get reqs to the hashnode API. I need axios on runtime. At this point i even had not understood my project yet. Confidence was running low. I Remember before going to bed i had a realization. Im not going to win this if it only works on my one repo. Part of the judgement is obviously the reusability of whatever it is the participants are building.

## Creating a reusable github action on Github marketplace

I decided to procrastinate my node modules dilemma. I started researching on how im going to create a reusable action. Read a lot on the github documentation about creating javascript actions. It seemed so easy i quickly spun one up that could make just one request to fetch a publication Id from hashnode.

My code looked something like this in the action.yml file.

```
//most parts omitted.
runs:
  using: 'node20'
  main: 'index.js'

```

Now there is a problem with this approach. You guessed it! Node modules. At this point remember i don`t even know that you can self test a github action. I kept compiling one, making a release , pushing it to github marketplace, only for me to test it from another repos action and have it fail. (I ended up doing this something like 25 times.) I'm not kidding you can check out the number of release on the github repo if i have not deleted them out of embarrassment.

![take a look at this shit](https://pbs.twimg.com/media/GFLrAWqWUAAAsp3?format=jpg&name=large)

Nothing worked brothers. I kept running into all sorts of module not found errors. I remember i kept asking myself. I run `pnpm install --frozen-lock-file` why tf does it still not find the damn MODULaaaarrr. Jezus.

I later came to find out that `pnpm install` installs the dependencies of the checked out repo not your stupid action.

Anyway. At some point i even pushed node_modules to github. I felt bad to be honest. Its really easy for me to feel guilty by temparament but i had to do it. I infact still have an open question on [github discussions](https://github.com/orgs/community/discussions/102976#discussioncomment-8337833) asking how to install modules. Some guy actually says its okay to push node_modules to github but i still feel cringe. actually that approach doesnt work anyway. I kept running into dependencies of dependecnies not being available on the pushed node-modules.

I abandoned the idea and decided to research like an engineer and stop taking shortcuts. Turns out there is a `composite action` which i still don't fully understand but it kind of helps you define steps that will run before executing your action. And you can even define the directory on which the step will run. Damn! Newver have i ever loved a green checkmark more. My action runs for the first time. Orgasms.

## So how does it work?

The action helps you write blogs inside a `BLOG.md` file in your `.hashnode` folder. Its highly customizable for example by default it willpick up your changelog, readme and publish it alongside your blog . You can be sure to read through the readme im sure it will be included in this blog too. _yes im going to publish this blog itself using my action_ You think im going to create something i myself im not using. Come on.

Well the project is not perfect. Im very sure there are bugs to be caught and errors to be thrown. But well you can`t loose if you gave it your all.

## Lessons learnt

- **Start early and embrace change**. Whatever project you are doing you probably don`t understand it as good as you think.

- **Don't give up**. I know its been _cliched_ to death but you just cant stop. It will work eventually.

- **Keep learning**. As a budding software engineer (graduated from campus two months ago). The importance of learning cannot be understated. I learnt a lot. Actually i bet like 67% of my head is aching right now.

- **chatGPT is most helpful when you know wtf you are doing**. Cant save you if you know nothing. It will actually help you tie your feet and hands together.

- **Don't test your work on submission deadline**.

### THA NEEEIIM - action.YAMOL AGEN.
