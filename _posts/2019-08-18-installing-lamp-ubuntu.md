---
layout: post
title: "Installing LAMP Stack on Ubuntu"
tags:
  - ubuntu
  - apache2
  - php
  - mysql
  - installation
---
In this blog post, we'll be learning how to install a LAMP stack in Ubuntu? I'll be using Ubuntu 18.04 LTS
and it should work very well in upcoming versions of Ubuntu versions too.

> Do not use these settings on **Live Servers**. The settings mentioned here only meant to be for a local development server. Use it on your own risk.

First of all, update your Ubuntu software package repository by executing below commands.

```
sudo apt update
sudo apt upgrade
```

If prompted for the password, enter it. Once you update the package repository you can start installing the LAMP stack.

### Installing Apache2 and PHP 

```
sudo apt install apache2   
sudo apt install php libapache2-mod-php
sudo apt install php-intl   # enabling PHP module intl
```

It's very important to install and enable `php-intl` library to perform various locale-aware operations. To enable this feature after installation, we need to open the `php.ini` file. To confirm correct and currently loaded `php.ini` file, create a file named `info.php` inside `/var/www/html/`.

To create `info.php` execute below command.

    sudo echo "<?php phpinfo(); ?>" >> /var/www/html/info.php

Now open any web browser of your wish and hit the URL `http://localhost/info.php`

Check for the **Loaded Configuration File**. Which will look something like this `/etc/php/7.x/apache2/php.ini`

Here, `7.x` is the PHP version installed on your system.

Now open the same `php.ini` file in any text editors like nano or vim. Search for `;extension=intl;` and remove the semicolon from starting of the line, save and exit. 

    extension=intl;

Restart Apache server

    sudo service apache2 restart

By default, the root directory for deploying projects will be `/var/www/html` and if you want to change it, we need to edit the `000-default.conf` file. But before that, I'd highly recommend you to keep a copy of this file. If something goes wrong with our configuration file, we can easily revert it back to the original state.

First, create a copy of the file.

```
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.bkp.conf
```

Now, you're good to edit the `000-default.conf` file. Edit with nano or any text editor you're familiar with.

```
sudo nano /etc/apache2/sites-available/000-default.conf
```

Change `DocumentRoot` value to something else, save and close the file. Don't forget to restart Apache server.

### Installing MySQL

```
sudo apt install mysql-server
```

After installation, it's time to configure MySQL. In order to do that execute below command.

```
sudo mysql_secure_installation  ## and hit Enter
```

When you run the above command you'll be prompted with some questionnaire. Which is required to secure the MySQL installation.

> By default MySQL server will not allow you to access the database remotely (MySQL GUI clients like MySQL Workbench, SQLyog, Heidi SQL, etc) with `root` privileges for security reasons. If you're on the local machine and want to access databases with GUI clients, create a new user or allow `root` user to access databases remotely.

For more read MySQL's [offical doc](https://dev.mysql.com/doc/refman/5.6/en/validate-password-options-variables.html)