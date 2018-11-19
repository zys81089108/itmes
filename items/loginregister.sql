/*
Navicat MySQL Data Transfer

Source Server         : items
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : items

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2018-11-16 14:32:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `loginregister`
-- ----------------------------
DROP TABLE IF EXISTS `loginregister`;
CREATE TABLE `loginregister` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` text,
  `password` text,
  `hePhone` text,
  `birthday` text,
  `email` text,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loginregister
-- ----------------------------
INSERT INTO `loginregister` VALUES ('1', '15881089108', '123456789', '', '', '');
INSERT INTO `loginregister` VALUES ('2', '13541176288', '123456789', '', '', '');
