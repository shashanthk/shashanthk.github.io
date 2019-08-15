---
layout: post
title: "Installing Oracle JDK 8 in Ubuntu"
tags:
  - ubuntu
  - JDK8
  - installation
---

In this blog post we'll learn how to install Oracle JDK 8 in Ubuntu Linux systems? This should work on all Debian based Linux systems as well.

Download latest JDK 8 from Oracle's official [site](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

After downloading open terminal and browse to downloaded directory. And in terminal execute below commands. 

Let's assume that we downloaded JDK 8 into `Downloads` directory. If you've downloaded it to some other directory, change the directory in terminal and start executing below commands.

    tar -xvf jdk-8uxyz-linux-x64.tar.gz   # extract tar ball
    sudo mkdir -p /usr/lib/jvm            # create new folder jvm
    sudo mv jdk1.8.x /usr/lib/jvm/        # move extracted folder 
    
Now update default JDK path to Oracle JDK

    sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.8.x/bin/java" 1
    sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.8.x/bin/javac" 1
    sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/lib/jvm/jdk1.8.x/bin/javaws" 1
    
Correct ownership

    sudo chmod a+x /usr/bin/java
    sudo chmod a+x /usr/bin/javac
    sudo chmod a+x /usr/bin/javaws
    sudo chown -R root:root /usr/lib/jvm/jdk1.8.x
    
Now check which JDK is set as default. Below command will show all the list of JDK's installed in our system. Just enter selection number and hit enter to set it as default JDK.

    sudo update-alternatives --config java
    
Just replace `java` with `javac` or `javaws` if you want to set defaults for these commands as well.

Now check JDK path by executing below command.

    echo $JAVA_HOME
    
If it returns updated/custom JDK path, you're good go! To check JDK version, simply run below command.

    java -version