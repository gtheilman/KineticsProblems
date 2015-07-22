**Disclaimer of liability:  This tool is not to be used in any situation that involves treating a patient.   It is
strictly for non-therapeutic demonstration of pharmacokinetic principles**


##Kinetics Problems

This is a series of online tools that I use when teaching pharmacy students pharmacokinetics.   You can see a demo [here](http://bitly.com/theilmankinetics).   

*Note:  Please don't send your students to my demo.   I'm paying for the traffic it gets.  If you want your students to use the software, please deploy a copy on your own server*

I noticed that first year pharmacy students had difficulty with word problems that contained more information than was needed.  For example, I once included a molecular weight in a pharmacokinetic problem in a homework assignment.   The next day, a student came up to me and asked how to work the molecular weight into the equations.   I told her that the molecular weight wasn't needed to answer the question.

She looked at me like I slapped her mother.

*I spent...two hours...trying to find an equation in the book that included concentrations, time and molecular weight!*

The problem is that students sometimes work backwards.   They look at what information is presented in the problem and then try to find an equation that has those elements.    This often works for them because *writing word problems is hard*.   There's a tendency on the part of the faculty member to include just enough information to solve the problem.   Making up a bunch of details about the patient that aren't necessary takes time and effort.

So, one thing this tool does is it creates random patient cases.   Every time the student clicks "refresh" on their browser, the case is different.   What I am trying to do is teach them to figure out what information they need *first*.   It also helps first-year students (who haven't yet been on experiential rotations) learn where they might find that information in the medical record.

The second thing the tool tries to do is teach a structured approach to solving the problems.    The basic steps I stress are

*   Draw a picture of what's going on
*   Take an intuitive guess as to what the answer is going to look like
*   Do the math
*   Go back and ask "Does the answer I got make sense?"
   
While I was putting this together, I also incorporated some online calculators I put together a few years ago (these are the "Sandbox" tools).   

This was my first attempt at a project using Angular JS.   The source code is not pretty...

I got caught up in some other projects and only finished a few of the tutorials I planned.  I may work on this again at some later date.

### Installation

There is no database associated with this application.   It's just JavaScript and can be run locally in a browser without deploying it to a website.

It is based on the [angular-seed](https://github.com/angular/angular-seed) project.   Rather than repeat the instructions from that project, I'd suggest you just take a look at that page.   Basically, you need to have NPM and Bower installed.  Then you run <code>npm install</code> and <code>npm start</code>.   Point your web browser at <code>http://localhost:8000/app/index.html#/menu</code>.

The patient cases are assembled in a kind-of [Mad Lib](https://en.wikipedia.org/wiki/Mad_Libs) process where various phrases are thrown together to come up with a "new" patient case.   Sometimes the cases may not be internally consistent.   But the idea is more to teach students where in the patient case to find the information they need rather than teaching pathophysiology.


###Notification of Use

**If you use this software for a class, please send me an email letting me know.**  This is just so I can include some information on my faculty activity report regarding how the software is being used.

### More Disclaimers

Again, this is not a clinical tool.   Do not use this to treat patients.   It's a tool for teaching pharmacokinetic principles, not for patient care.

