import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";
import StudentFooter from "../components/StudentFooter";
import FloatingChatbot from "../components/FloatingChatbot";

import {
  FaHome,
  FaBook,
  FaCodeBranch,
  FaFileAlt,
  FaComments,
  FaRobot,
  FaRocket,
  FaMapMarkedAlt,
  FaBolt,
  FaAward,
  FaCertificate,
  FaChartLine,
  FaFileInvoice,
  FaCog,
  FaSearch,
  FaBell,
  FaCode,
  FaCalendarAlt,
  FaTrophy,
  FaCheckCircle,
  FaRegCircle,
  FaStar,
  FaRegStar,
  FaPlay,
  FaLock,
  FaChevronRight,
  FaChevronLeft,
  FaFilter,
  FaBookmark,
  FaRegBookmark,
  FaArrowRight,
  FaFire,
  FaBullseye,
  FaSun,
  FaMoon
} from "react-icons/fa";

import studentHeroImg from "../assets/student_dashboard_hero_illustration.png";
import darkReactLearningHero from "../assets/dark_react_learning_hero.png";
import lightReactLearningHero from "../assets/light_react_learning_hero.png";
import "../styles/studentDashboard.css";
import "../styles/codeArena.css";

export default function CodeArenaPage() {
  const { user, xp, earnXp, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";

  const userName = user?.full_name || user?.username || "Riya Sharma";
  const userXp = xp ?? 16250;
  const userLevel = Math.floor(userXp / 2000) + 1;

  // Active Filters & Pagination States (10 Questions Per Page)
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState("All");
  const [selectedTopicFilter, setSelectedTopicFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isContestRegistered, setIsContestRegistered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDifficulty, selectedCompanyFilter, selectedTopicFilter, searchQuery]);

  // Active Problem Solver Modal State
  const [activeProblem, setActiveProblem] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState("description"); // "description" | "submissions"
  const [userCode, setUserCode] = useState("");
  const [selectedLang, setSelectedLang] = useState("JavaScript");
  const [testOutput, setTestOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Previous Submissions Database State
  const [submissionsHistory, setSubmissionsHistory] = useState({
    1: [
      {
        id: "sub_101",
        timestamp: "10 mins ago",
        lang: "Java 17",
        status: "Accepted",
        isPassed: true,
        runtime: "0.02 sec",
        memory: "14.8 MB",
        code: `//{ Driver Code Starts\nimport java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n          int diff = target - nums[i];\n          if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n          map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
      },
      {
        id: "sub_102",
        timestamp: "1 hour ago",
        lang: "Python 3.10",
        status: "Compilation Error",
        isPassed: false,
        runtime: "0.00 sec",
        memory: "0 KB",
        code: `# User Function Template for Python 3\nclass Solution:\n    def twoSum(self, nums, target):\n        for i in range(len(nums)):\n            if nums[i] + nums[j] == target\n                return [i, j]`
      }
    ],
    2: [
      {
        id: "sub_201",
        timestamp: " Yesterday",
        lang: "JavaScript",
        status: "Accepted",
        isPassed: true,
        runtime: "0.04 sec",
        memory: "15.1 MB",
        code: `function addTwoNumbers(l1, l2) {\n  let dummy = new ListNode(0), curr = dummy, carry = 0;\n  while (l1 || l2 || carry) {\n    let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;\n    carry = Math.floor(sum / 10);\n    curr.next = new ListNode(sum % 10);\n    curr = curr.next;\n    if (l1) l1 = l1.next;\n    if (l2) l2 = l2.next;\n  }\n  return dummy.next;\n}`
      }
    ]
  });

  // Solved & Bookmarked State
  const [solvedProblemIds, setSolvedProblemIds] = useState([1, 2, 3, 7, 8]);
  const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState([1, 4]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "courses", label: "Courses", icon: <FaBook /> },
    { id: "learning-paths", label: "Learning Paths", icon: <FaCodeBranch /> },
    { id: "assignments", label: "Assignments", icon: <FaFileAlt /> },
    { id: "discussions", label: "Discussions", icon: <FaComments /> },
    { id: "ai-buddy", label: "AI Study Buddy", icon: <FaRobot />, isNew: true },
    { id: "opportunity-feed", label: "Opportunity Feed", icon: <FaRocket />, isNew: true },
    { id: "daily-quests", label: "Daily Quests", icon: <FaBolt /> },
    { id: "badges", label: "Badges", icon: <FaAward /> },
    { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
    { id: "progress", label: "Progress", icon: <FaChartLine /> },
    { id: "resume", label: "Resume Builder", icon: <FaFileInvoice /> },
    { id: "code-arena", label: "CodeArena", icon: <FaCode />, isNew: true },
    { id: "settings", label: "Settings", icon: <FaCog /> }
  ];

  // Company Cards List
  const companies = [
    { id: "Google", name: "Google", questions: "250 Questions" },
    { id: "Amazon", name: "Amazon", questions: "400 Questions" },
    { id: "Microsoft", name: "Microsoft", questions: "220 Questions" },
    { id: "Adobe", name: "Adobe", questions: "150 Questions" },
    { id: "Goldman Sachs", name: "Goldman Sachs", questions: "180 Questions" },
    { id: "Walmart", name: "Walmart", questions: "130 Questions" },
    { id: "Atlassian", name: "Atlassian", questions: "95 Questions" }
  ];

  // Topics Grid List
  const topics = [
    { id: "Arrays", title: "Arrays", questions: "120 Questions", pct: 78, xpVal: "+250 XP", icon: "📊", color: "#10B981" },
    { id: "Strings", title: "Strings", questions: "95 Questions", pct: 65, xpVal: "+200 XP", icon: "Aa", color: "#3B82F6" },
    { id: "Linked List", title: "Linked List", questions: "85 Questions", pct: 70, xpVal: "+200 XP", icon: "🔗", color: "#6366F1" },
    { id: "Trees", title: "Trees", questions: "110 Questions", pct: 72, xpVal: "+250 XP", icon: "🌲", color: "#10B981" },
    { id: "Graphs", title: "Graphs", questions: "105 Questions", pct: 60, xpVal: "+250 XP", icon: "🕸️", color: "#EC4899" },
    { id: "Heap", title: "Heap", questions: "70 Questions", pct: 55, xpVal: "+150 XP", icon: "🥞", color: "#F59E0B" },
    { id: "DP", title: "DP", questions: "150 Questions", pct: 68, xpVal: "+300 XP", icon: "🧮", color: "#8B5CF6" },
    { id: "Greedy", title: "Greedy", questions: "65 Questions", pct: 62, xpVal: "+150 XP", icon: "👑", color: "#EAB308" },
    { id: "Backtracking", title: "Backtracking", questions: "80 Questions", pct: 50, xpVal: "+150 XP", icon: "🧩", color: "#A855F7" },
    { id: "Bit Manipulation", title: "Bit Manipulation", questions: "60 Questions", pct: 48, xpVal: "+150 XP", icon: "010", color: "#06B6D4" }
  ];

  // Problems Master Dataset (52 LeetCode-Style Functional Questions)
  const problems = [
    { id: 1, title: "Two Sum", company: "Amazon", difficulty: "Easy", topic: "Arrays", xpVal: "+20 XP", acceptance: "58.23%", desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", starterCode: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}` },
    { id: 2, title: "Add Two Numbers", company: "Microsoft", difficulty: "Medium", topic: "Linked List", xpVal: "+50 XP", acceptance: "42.10%", desc: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.", starterCode: `function addTwoNumbers(l1, l2) {\n  let dummy = new ListNode(0), curr = dummy, carry = 0;\n  while (l1 || l2 || carry) {\n    let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;\n    carry = Math.floor(sum / 10);\n    curr.next = new ListNode(sum % 10);\n    curr = curr.next;\n    if (l1) l1 = l1.next;\n    if (l2) l2 = l2.next;\n  }\n  return dummy.next;\n}` },
    { id: 3, title: "Longest Substring Without Repeating Characters", company: "Meta", difficulty: "Medium", topic: "Strings", xpVal: "+50 XP", acceptance: "34.80%", desc: "Given a string s, find the length of the longest substring without repeating characters.", starterCode: `function lengthOfLongestSubstring(s) {\n  let set = new Set(), left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}` },
    { id: 4, title: "Median of Two Sorted Arrays", company: "Google", difficulty: "Hard", topic: "Binary Search", xpVal: "+100 XP", acceptance: "37.50%", desc: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.", starterCode: `function findMedianSortedArrays(nums1, nums2) {\n  const merged = [...nums1, ...nums2].sort((a,b) => a - b);\n  const mid = Math.floor(merged.length / 2);\n  return merged.length % 2 !== 0 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;\n}` },
    { id: 5, title: "Longest Palindromic Substring", company: "Amazon", difficulty: "Medium", topic: "DP", xpVal: "+60 XP", acceptance: "32.40%", desc: "Given a string s, return the longest palindromic substring in s.", starterCode: `function longestPalindrome(s) {\n  if (!s || s.length < 1) return "";\n  let start = 0, end = 0;\n  for (let i = 0; i < s.length; i++) {\n    let len1 = expandAroundCenter(s, i, i);\n    let len2 = expandAroundCenter(s, i, i + 1);\n    let len = Math.max(len1, len2);\n    if (len > end - start) {\n      start = i - Math.floor((len - 1) / 2);\n      end = i + Math.floor(len / 2);\n    }\n  }\n  return s.substring(start, end + 1);\n}\nfunction expandAroundCenter(s, left, right) {\n  while (left >= 0 && right < s.length && s[left] === s[right]) { left--; right++; }\n  return right - left - 1;\n}` },
    { id: 6, title: "Zigzag Conversion", company: "PayPal", difficulty: "Medium", topic: "Strings", xpVal: "+45 XP", acceptance: "46.10%", desc: "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows. Read line by line.", starterCode: `function convert(s, numRows) {\n  if (numRows === 1 || s.length <= numRows) return s;\n  let rows = Array.from({ length: numRows }, () => "");\n  let currRow = 0, goingDown = false;\n  for (let c of s) {\n    rows[currRow] += c;\n    if (currRow === 0 || currRow === numRows - 1) goingDown = !goingDown;\n    currRow += goingDown ? 1 : -1;\n  }\n  return rows.join("");\n}` },
    { id: 7, title: "Reverse Integer", company: "Apple", difficulty: "Medium", topic: "Math", xpVal: "+40 XP", acceptance: "27.90%", desc: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes overflow, return 0.", starterCode: `function reverse(x) {\n  let rev = parseInt(Math.abs(x).toString().split('').reverse().join('')) * Math.sign(x);\n  if (rev < -Math.pow(2, 31) || rev > Math.pow(2, 31) - 1) return 0;\n  return rev;\n}` },
    { id: 8, title: "String to Integer (atoi)", company: "Microsoft", difficulty: "Medium", topic: "Strings", xpVal: "+50 XP", acceptance: "16.80%", desc: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.", starterCode: `function myAtoi(s) {\n  let parsed = parseInt(s, 10);\n  if (isNaN(parsed)) return 0;\n  const MAX = Math.pow(2, 31) - 1, MIN = -Math.pow(2, 31);\n  return Math.max(MIN, Math.min(MAX, parsed));\n}` },
    { id: 9, title: "Palindrome Number", company: "Adobe", difficulty: "Easy", topic: "Math", xpVal: "+15 XP", acceptance: "54.70%", desc: "Given an integer x, return true if x is a palindrome, and false otherwise.", starterCode: `function isPalindrome(x) {\n  if (x < 0) return false;\n  return x.toString() === x.toString().split('').reverse().join('');\n}` },
    { id: 10, title: "Container With Most Water", company: "Google", difficulty: "Medium", topic: "Arrays", xpVal: "+55 XP", acceptance: "54.10%", desc: "Given n non-negative integers height where each represents a point at coordinate (i, height[i]). Find two lines that form a container storing most water.", starterCode: `function maxArea(height) {\n  let left = 0, right = height.length - 1, max = 0;\n  while (left < right) {\n    let h = Math.min(height[left], height[right]);\n    max = Math.max(max, h * (right - left));\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return max;\n}` },
    { id: 11, title: "Integer to Roman", company: "Amazon", difficulty: "Medium", topic: "Strings", xpVal: "+40 XP", acceptance: "62.30%", desc: "Given an integer, convert it to a roman numeral string.", starterCode: `function intToRoman(num) {\n  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];\n  const symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];\n  let res = "";\n  for (let i = 0; i < values.length; i++) {\n    while (num >= values[i]) { res += symbols[i]; num -= values[i]; }\n  }\n  return res;\n}` },
    { id: 12, title: "Roman to Integer", company: "Meta", difficulty: "Easy", topic: "Strings", xpVal: "+15 XP", acceptance: "60.10%", desc: "Given a roman numeral string, convert it to an integer.", starterCode: `function romanToInt(s) {\n  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };\n  let sum = 0;\n  for (let i = 0; i < s.length; i++) {\n    let curr = map[s[i]], next = map[s[i+1]];\n    if (next > curr) sum -= curr; else sum += curr;\n  }\n  return sum;\n}` },
    { id: 13, title: "Longest Common Prefix", company: "Apple", difficulty: "Easy", topic: "Strings", xpVal: "+15 XP", acceptance: "41.50%", desc: "Write a function to find the longest common prefix string amongst an array of strings.", starterCode: `function longestCommonPrefix(strs) {\n  if (!strs.length) return "";\n  let prefix = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (strs[i].indexOf(prefix) !== 0) {\n      prefix = prefix.substring(0, prefix.length - 1);\n      if (!prefix) return "";\n    }\n  }\n  return prefix;\n}` },
    { id: 14, title: "3Sum", company: "Meta", difficulty: "Medium", topic: "Arrays", xpVal: "+60 XP", acceptance: "33.20%", desc: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.", starterCode: `function threeSum(nums) {\n  nums.sort((a,b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      let sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        res.push([nums[i], nums[left], nums[right]]);\n        while (nums[left] === nums[left+1]) left++;\n        while (nums[right] === nums[right-1]) right--;\n        left++; right--;\n      } else if (sum < 0) left++; else right--;\n    }\n  }\n  return res;\n}` },
    { id: 15, title: "3Sum Closest", company: "Amazon", difficulty: "Medium", topic: "Arrays", xpVal: "+50 XP", acceptance: "46.80%", desc: "Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.", starterCode: `function threeSumClosest(nums, target) {\n  nums.sort((a,b) => a - b);\n  let closest = nums[0] + nums[1] + nums[2];\n  for (let i = 0; i < nums.length - 2; i++) {\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      let sum = nums[i] + nums[left] + nums[right];\n      if (Math.abs(target - sum) < Math.abs(target - closest)) closest = sum;\n      if (sum < target) left++; else right--;\n    }\n  }\n  return closest;\n}` },
    { id: 16, title: "Letter Combinations of a Phone Number", company: "Google", difficulty: "Medium", topic: "Backtracking", xpVal: "+60 XP", acceptance: "56.40%", desc: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.", starterCode: `function letterCombinations(digits) {\n  if (!digits) return [];\n  const phone = {"2":"abc","3":"def","4":"ghi","5":"jkl","6":"mno","7":"pqrs","8":"tuv","9":"wxyz"};\n  const res = [];\n  function backtrack(index, path) {\n    if (path.length === digits.length) { res.push(path); return; }\n    for (let char of phone[digits[index]]) {\n      backtrack(index + 1, path + char);\n    }\n  }\n  backtrack(0, "");\n  return res;\n}` },
    { id: 17, title: "4Sum", company: "Apple", difficulty: "Medium", topic: "Arrays", xpVal: "+65 XP", acceptance: "36.10%", desc: "Given an array nums of n integers, return an array of all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that sum equals target.", starterCode: `function fourSum(nums, target) {\n  nums.sort((a,b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 3; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    for (let j = i + 1; j < nums.length - 2; j++) {\n      if (j > i + 1 && nums[j] === nums[j-1]) continue;\n      let left = j + 1, right = nums.length - 1;\n      while (left < right) {\n        let sum = nums[i] + nums[j] + nums[left] + nums[right];\n        if (sum === target) {\n          res.push([nums[i], nums[j], nums[left], nums[right]]);\n          while (nums[left] === nums[left+1]) left++;\n          while (nums[right] === nums[right-1]) right--;\n          left++; right--;\n        } else if (sum < target) left++; else right--;\n      }\n    }\n  }\n  return res;\n}` },
    { id: 18, title: "Remove Nth Node From End of List", company: "Microsoft", difficulty: "Medium", topic: "Linked List", xpVal: "+50 XP", acceptance: "42.30%", desc: "Given the head of a linked list, remove the nth node from the end of the list and return its head.", starterCode: `function removeNthFromEnd(head, n) {\n  let dummy = new ListNode(0, head), fast = dummy, slow = dummy;\n  for (let i = 0; i <= n; i++) fast = fast.next;\n  while (fast) { fast = fast.next; slow = slow.next; }\n  slow.next = slow.next.next;\n  return dummy.next;\n}` },
    { id: 19, title: "Valid Parentheses", company: "Amazon", difficulty: "Easy", topic: "Strings", xpVal: "+20 XP", acceptance: "40.30%", desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", starterCode: `function isValid(s) {\n  const stack = [], map = { ')':'(', '}':'{', ']':'[' };\n  for (let char of s) {\n    if (char === '(' || char === '{' || char === '[') stack.push(char);\n    else if (stack.pop() !== map[char]) return false;\n  }\n  return stack.length === 0;\n}` },
    { id: 20, title: "Merge Two Sorted Lists", company: "Google", difficulty: "Easy", topic: "Linked List", xpVal: "+20 XP", acceptance: "62.80%", desc: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.", starterCode: `function mergeTwoLists(list1, list2) {\n  if (!list1) return list2; if (!list2) return list1;\n  if (list1.val < list2.val) { list1.next = mergeTwoLists(list1.next, list2); return list1; }\n  else { list2.next = mergeTwoLists(list1, list2.next); return list2; }\n}` },
    { id: 21, title: "Generate Parentheses", company: "Meta", difficulty: "Medium", topic: "Backtracking", xpVal: "+55 XP", acceptance: "72.90%", desc: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.", starterCode: `function generateParenthesis(n) {\n  const res = [];\n  function backtrack(open, close, str) {\n    if (str.length === n * 2) { res.push(str); return; }\n    if (open < n) backtrack(open + 1, close, str + "(");\n    if (close < open) backtrack(open, close + 1, str + ")");\n  }\n  backtrack(0, 0, "");\n  return res;\n}` },
    { id: 22, title: "Merge k Sorted Lists", company: "Amazon", difficulty: "Hard", topic: "Heap", xpVal: "+120 XP", acceptance: "50.10%", desc: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all into one sorted linked-list.", starterCode: `function mergeKLists(lists) {\n  if (!lists.length) return null;\n  while (lists.length > 1) {\n    let merged = [];\n    for (let i = 0; i < lists.length; i += 2) {\n      let l1 = lists[i], l2 = lists[i+1] || null;\n      merged.push(mergeTwoLists(l1, l2));\n    }\n    lists = merged;\n  }\n  return lists[0];\n}` },
    { id: 23, title: "Swap Nodes in Pairs", company: "Uber", difficulty: "Medium", topic: "Linked List", xpVal: "+50 XP", acceptance: "62.40%", desc: "Given a linked list, swap every two adjacent nodes and return its head.", starterCode: `function swapPairs(head) {\n  if (!head || !head.next) return head;\n  let first = head, second = head.next;\n  first.next = swapPairs(second.next);\n  second.next = first;\n  return second;\n}` },
    { id: 24, title: "Reverse Nodes in k-Group", company: "Microsoft", difficulty: "Hard", topic: "Linked List", xpVal: "+130 XP", acceptance: "56.80%", desc: "Given the head of a linked list, reverse the nodes of the list k at a time, and return its modified list.", starterCode: `function reverseKGroup(head, k) {\n  let curr = head, count = 0;\n  while (curr && count !== k) { curr = curr.next; count++; }\n  if (count === k) {\n    curr = reverseKGroup(curr, k);\n    while (count-- > 0) {\n      let tmp = head.next;\n      head.next = curr;\n      curr = head;\n      head = tmp;\n    }\n    head = curr;\n  }\n  return head;\n}` },
    { id: 25, title: "Remove Duplicates from Sorted Array", company: "Adobe", difficulty: "Easy", topic: "Arrays", xpVal: "+15 XP", acceptance: "53.90%", desc: "Given an integer array nums sorted in non-decreasing order, remove duplicates in-place.", starterCode: `function removeDuplicates(nums) {\n  if (!nums.length) return 0;\n  let i = 0;\n  for (let j = 1; j < nums.length; j++) {\n    if (nums[j] !== nums[i]) { i++; nums[i] = nums[j]; }\n  }\n  return i + 1;\n}` },
    { id: 26, title: "Remove Element", company: "Apple", difficulty: "Easy", topic: "Arrays", xpVal: "+15 XP", acceptance: "56.20%", desc: "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.", starterCode: `function removeElement(nums, val) {\n  let k = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== val) { nums[k] = nums[i]; k++; }\n  }\n  return k;\n}` },
    { id: 27, title: "Find First Occurrence in a String", company: "Google", difficulty: "Easy", topic: "Strings", xpVal: "+15 XP", acceptance: "40.20%", desc: "Given two strings haystack and needle, return the index of the first occurrence of needle in haystack.", starterCode: `function strStr(haystack, needle) {\n  return haystack.indexOf(needle);\n}` },
    { id: 28, title: "Divide Two Integers", company: "Meta", difficulty: "Medium", topic: "Math", xpVal: "+50 XP", acceptance: "21.40%", desc: "Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.", starterCode: `function divide(dividend, divisor) {\n  const MAX = Math.pow(2, 31) - 1, MIN = -Math.pow(2, 31);\n  if (dividend === MIN && divisor === -1) return MAX;\n  let ans = Math.trunc(dividend / divisor);\n  return ans;\n}` },
    { id: 29, title: "Substring with Concatenation of All Words", company: "Netflix", difficulty: "Hard", topic: "Strings", xpVal: "+110 XP", acceptance: "31.20%", desc: "You are given a string s and an array of strings words of the same length. Return all starting indices of substring(s) in s that is a concatenation of each word in words exactly once.", starterCode: `function findSubstring(s, words) {\n  if (!s || !words.length) return [];\n  const wordLen = words[0].length, totalLen = wordLen * words.length, res = [];\n  const map = {}; for (let w of words) map[w] = (map[w] || 0) + 1;\n  for (let i = 0; i <= s.length - totalLen; i++) {\n    const seen = {}; let j = 0;\n    while (j < words.length) {\n      const word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);\n      if (word in map) {\n        seen[word] = (seen[word] || 0) + 1;\n        if (seen[word] > map[word]) break;\n      } else break;\n      j++;\n    }\n    if (j === words.length) res.push(i);\n  }\n  return res;\n}` },
    { id: 30, title: "Next Permutation", company: "Goldman Sachs", difficulty: "Medium", topic: "Arrays", xpVal: "+60 XP", acceptance: "38.20%", desc: "Rearrange numbers into the lexicographically next greater permutation of numbers.", starterCode: `function nextPermutation(nums) {\n  let i = nums.length - 2;\n  while (i >= 0 && nums[i] >= nums[i+1]) i--;\n  if (i >= 0) {\n    let j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    [nums[i], nums[j]] = [nums[j], nums[i]];\n  }\n  let l = i + 1, r = nums.length - 1;\n  while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }\n}` },
    { id: 31, title: "Longest Valid Parentheses", company: "Google", difficulty: "Hard", topic: "DP", xpVal: "+100 XP", acceptance: "33.10%", desc: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.", starterCode: `function longestValidParentheses(s) {\n  let stack = [-1], maxLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === '(') stack.push(i);\n    else {\n      stack.pop();\n      if (!stack.length) stack.push(i);\n      else maxLen = Math.max(maxLen, i - stack[stack.length - 1]);\n    }\n  }\n  return maxLen;\n}` },
    { id: 32, title: "Search in Rotated Sorted Array", company: "Amazon", difficulty: "Medium", topic: "Binary Search", xpVal: "+50 XP", acceptance: "39.80%", desc: "Given the array nums after possible rotation and an integer target, return the index of target if it is in nums, or -1.", starterCode: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    let mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1; else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1; else r = mid - 1;\n    }\n  }\n  return -1;\n}` },
    { id: 33, title: "Find First and Last Position in Sorted Array", company: "Microsoft", difficulty: "Medium", topic: "Binary Search", xpVal: "+50 XP", acceptance: "42.80%", desc: "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.", starterCode: `function searchRange(nums, target) {\n  return [nums.indexOf(target), nums.lastIndexOf(target)];\n}` },
    { id: 34, title: "Search Insert Position", company: "Adobe", difficulty: "Easy", topic: "Binary Search", xpVal: "+15 XP", acceptance: "44.60%", desc: "Given a sorted array of distinct integers and a target value, return the index if target is found. If not, return index where it would be.", starterCode: `function searchInsert(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    let mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1; else r = mid - 1;\n  }\n  return l;\n}` },
    { id: 35, title: "Valid Sudoku", company: "Uber", difficulty: "Medium", topic: "Arrays", xpVal: "+50 XP", acceptance: "58.70%", desc: "Determine if a 9 x 9 Sudoku board is valid. Only filled cells need to be validated according to rules.", starterCode: `function isValidSudoku(board) {\n  const set = new Set();\n  for (let i = 0; i < 9; i++) {\n    for (let j = 0; j < 9; j++) {\n      let val = board[i][j];\n      if (val !== '.') {\n        let row = \`\${val} in row \${i}\`,\n            col = \`\${val} in col \${j}\`,\n            box = \`\${val} in box \${Math.floor(i/3)}-\${Math.floor(j/3)}\`;\n        if (set.has(row) || set.has(col) || set.has(box)) return false;\n        set.add(row); set.add(col); set.add(box);\n      }\n    }\n  }\n  return true;\n}` },
    { id: 36, title: "Sudoku Solver", company: "Google", difficulty: "Hard", topic: "Backtracking", xpVal: "+140 XP", acceptance: "59.20%", desc: "Write a program to solve a Sudoku puzzle by filling empty cells.", starterCode: `function solveSudoku(board) {\n  function isValid(r, c, val) {\n    for (let i = 0; i < 9; i++) {\n      if (board[r][i] === val || board[i][c] === val) return false;\n      let boxR = 3 * Math.floor(r / 3) + Math.floor(i / 3);\n      let boxC = 3 * Math.floor(c / 3) + i % 3;\n      if (board[boxR][boxC] === val) return false;\n    }\n    return true;\n  }\n  function solve() {\n    for (let r = 0; r < 9; r++) {\n      for (let c = 0; c < 9; c++) {\n        if (board[r][c] === '.') {\n          for (let ch = 1; ch <= 9; ch++) {\n            let val = ch.toString();\n            if (isValid(r, c, val)) {\n              board[r][c] = val;\n              if (solve()) return true;\n              board[r][c] = '.';\n            }\n          }\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n  solve();\n}` },
    { id: 37, title: "Count and Say", company: "Meta", difficulty: "Medium", topic: "Strings", xpVal: "+40 XP", acceptance: "53.60%", desc: "The count-and-say sequence is a sequence of digit strings defined by the recursive formula.", starterCode: `function countAndSay(n) {\n  let str = "1";\n  for (let i = 1; i < n; i++) {\n    str = str.replace(/(.)\\1*/g, (match, p1) => match.length + p1);\n  }\n  return str;\n}` },
    { id: 38, title: "Combination Sum", company: "Amazon", difficulty: "Medium", topic: "Backtracking", xpVal: "+55 XP", acceptance: "69.80%", desc: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations.", starterCode: `function combinationSum(candidates, target) {\n  const res = [];\n  function backtrack(start, path, sum) {\n    if (sum === target) { res.push([...path]); return; }\n    if (sum > target) return;\n    for (let i = start; i < candidates.length; i++) {\n      path.push(candidates[i]);\n      backtrack(i, path, sum + candidates[i]);\n      path.pop();\n    }\n  }\n  backtrack(0, [], 0);\n  return res;\n}` },
    { id: 39, title: "Combination Sum II", company: "Microsoft", difficulty: "Medium", topic: "Backtracking", xpVal: "+60 XP", acceptance: "53.80%", desc: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations where candidate numbers sum to target.", starterCode: `function combinationSum2(candidates, target) {\n  candidates.sort((a,b) => a - b);\n  const res = [];\n  function backtrack(start, path, sum) {\n    if (sum === target) { res.push([...path]); return; }\n    if (sum > target) return;\n    for (let i = start; i < candidates.length; i++) {\n      if (i > start && candidates[i] === candidates[i-1]) continue;\n      path.push(candidates[i]);\n      backtrack(i + 1, path, sum + candidates[i]);\n      path.pop();\n    }\n  }\n  backtrack(0, [], 0);\n  return res;\n}` },
    { id: 40, title: "First Missing Positive", company: "Amazon", difficulty: "Hard", topic: "Arrays", xpVal: "+110 XP", acceptance: "37.10%", desc: "Given an unsorted integer array nums, return the smallest missing positive integer in O(n) time.", starterCode: `function firstMissingPositive(nums) {\n  let i = 0;\n  while (i < nums.length) {\n    let correctIdx = nums[i] - 1;\n    if (nums[i] > 0 && nums[i] <= nums.length && nums[i] !== nums[correctIdx]) {\n      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];\n    } else i++;\n  }\n  for (let j = 0; j < nums.length; j++) {\n    if (nums[j] !== j + 1) return j + 1;\n  }\n  return nums.length + 1;\n}` },
    { id: 41, title: "Trapping Rain Water", company: "Google", difficulty: "Hard", topic: "Two Pointers", xpVal: "+150 XP", acceptance: "60.40%", desc: "Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.", starterCode: `function trap(height) {\n  let l = 0, r = height.length - 1, maxL = 0, maxR = 0, res = 0;\n  while (l < r) {\n    if (height[l] <= height[r]) {\n      if (height[l] >= maxL) maxL = height[l]; else res += maxL - height[l]; l++;\n    } else {\n      if (height[r] >= maxR) maxR = height[r]; else res += maxR - height[r]; r--;\n    }\n  }\n  return res;\n}` },
    { id: 42, title: "Multiply Strings", company: "Meta", difficulty: "Medium", topic: "Math", xpVal: "+50 XP", acceptance: "39.20%", desc: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2 as a string.", starterCode: `function multiply(num1, num2) {\n  return (BigInt(num1) * BigInt(num2)).toString();\n}` },
    { id: 43, title: "Wildcard Matching", company: "Apple", difficulty: "Hard", topic: "DP", xpVal: "+120 XP", acceptance: "27.40%", desc: "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.", starterCode: `function isMatch(s, p) {\n  let i = 0, j = 0, match = 0, starIdx = -1;\n  while (i < s.length) {\n    if (j < p.length && (p[j] === '?' || s[i] === p[j])) { i++; j++; }\n    else if (j < p.length && p[j] === '*') { starIdx = j; match = i; j++; }\n    else if (starIdx !== -1) { j = starIdx + 1; match++; i = match; }\n    else return false;\n  }\n  while (j < p.length && p[j] === '*') j++;\n  return j === p.length;\n}` },
    { id: 44, title: "Jump Game II", company: "Amazon", difficulty: "Medium", topic: "Greedy", xpVal: "+55 XP", acceptance: "40.10%", desc: "You are given a 0-indexed array of integers nums of length n. Return the minimum number of jumps to reach nums[n - 1].", starterCode: `function jump(nums) {\n  let jumps = 0, currentEnd = 0, farthest = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    farthest = Math.max(farthest, i + nums[i]);\n    if (i === currentEnd) { jumps++; currentEnd = farthest; }\n  }\n  return jumps;\n}` },
    { id: 45, title: "Permutations", company: "LinkedIn", difficulty: "Medium", topic: "Backtracking", xpVal: "+50 XP", acceptance: "76.40%", desc: "Given an array nums of distinct integers, return all the possible permutations. You can return answer in any order.", starterCode: `function permute(nums) {\n  const res = [];\n  function backtrack(curr) {\n    if (curr.length === nums.length) { res.push([...curr]); return; }\n    for (let num of nums) {\n      if (!curr.includes(num)) {\n        curr.push(num);\n        backtrack(curr);\n        curr.pop();\n      }\n    }\n  }\n  backtrack([]);\n  return res;\n}` },
    { id: 46, title: "Permutations II", company: "Microsoft", difficulty: "Medium", topic: "Backtracking", xpVal: "+55 XP", acceptance: "57.90%", desc: "Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations.", starterCode: `function permuteUnique(nums) {\n  nums.sort((a,b) => a - b);\n  const res = [], used = new Array(nums.length).fill(false);\n  function backtrack(path) {\n    if (path.length === nums.length) { res.push([...path]); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1])) continue;\n      used[i] = true;\n      path.push(nums[i]);\n      backtrack(path);\n      path.pop();\n      used[i] = false;\n    }\n  }\n  backtrack([]);\n  return res;\n}` },
    { id: 47, title: "Rotate Image", company: "Google", difficulty: "Medium", topic: "Arrays", xpVal: "+60 XP", acceptance: "71.90%", desc: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.", starterCode: `function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i; j < n; j++) [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n  }\n  for (let i = 0; i < n; i++) matrix[i].reverse();\n}` },
    { id: 48, title: "Group Anagrams", company: "Amazon", difficulty: "Medium", topic: "Strings", xpVal: "+50 XP", acceptance: "67.20%", desc: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.", starterCode: `function groupAnagrams(strs) {\n  const map = {};\n  for (let str of strs) {\n    let key = str.split('').sort().join('');\n    if (!map[key]) map[key] = [];\n    map[key].push(str);\n  }\n  return Object.values(map);\n}` },
    { id: 49, title: "Pow(x, n)", company: "Meta", difficulty: "Medium", topic: "Math", xpVal: "+45 XP", acceptance: "33.90%", desc: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).", starterCode: `function myPow(x, n) {\n  return Math.pow(x, n);\n}` },
    { id: 50, title: "N-Queens", company: "Google", difficulty: "Hard", topic: "Backtracking", xpVal: "+150 XP", acceptance: "65.40%", desc: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.", starterCode: `function solveNQueens(n) {\n  const res = [], board = Array.from({length:n}, () => ".".repeat(n));\n  function isValid(r, c) {\n    for (let i = 0; i < r; i++) {\n      if (board[i][c] === 'Q') return false;\n      if (c - (r - i) >= 0 && board[i][c - (r - i)] === 'Q') return false;\n      if (c + (r - i) < n && board[i][c + (r - i)] === 'Q') return false;\n    }\n    return true;\n  }\n  function backtrack(r) {\n    if (r === n) { res.push([...board]); return; }\n    for (let c = 0; c < n; c++) {\n      if (isValid(r, c)) {\n        board[r] = board[r].substring(0, c) + 'Q' + board[r].substring(c + 1);\n        backtrack(r + 1);\n        board[r] = board[r].substring(0, c) + '.' + board[r].substring(c + 1);\n      }\n    }\n  }\n  backtrack(0);\n  return res;\n}` },
    { id: 51, title: "Maximum Subarray", company: "Microsoft", difficulty: "Easy", topic: "Arrays", xpVal: "+20 XP", acceptance: "50.40%", desc: "Given an integer array nums, find the subarray with the largest sum, and return its sum.", starterCode: `function maxSubArray(nums) {\n  let maxSoFar = nums[0], maxEndingHere = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}` },
    { id: 52, title: "Spiral Matrix", company: "Apple", difficulty: "Medium", topic: "Arrays", xpVal: "+50 XP", acceptance: "47.80%", desc: "Given an m x n matrix, return all elements of the matrix in spiral order.", starterCode: `function spiralOrder(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]); top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]); right--;\n    if (top <= bottom) { for (let i = right; i >= left; i--) res.push(matrix[top][i]); bottom--; }\n    if (left <= right) { for (let i = bottom; i >= top; i--) res.push(matrix[i][left]); left++; }\n  }\n  return res;\n}` }
  ];

  // Filtered Problems & Pagination Slicing (10 Questions Per Page)
  const filteredProblems = problems.filter(p => {
    if (selectedDifficulty !== "All" && p.difficulty !== selectedDifficulty) return false;
    if (selectedCompanyFilter !== "All" && p.company !== selectedCompanyFilter) return false;
    if (selectedTopicFilter !== "All" && p.topic !== selectedTopicFilter) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // GFG-Style Language Code Generator Template
  const getLanguageTemplate = (problem, lang) => {
    const title = problem?.title || "Solution";
    const funcName = title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    if (lang === "Python") {
      return `# User Function Template for Python 3\nclass Solution:\n    def ${funcName}(self, nums, target):\n        # Complete the function\n        pass\n`;
    } else if (lang === "Java") {
      return `//{ Driver Code Starts\n// Initial Template for Java\nimport java.util.*;\nimport java.io.*;\n\nclass Solution {\n    public int[] ${funcName}(int[] nums, int target) {\n        // Complete the function\n        return new int[]{};\n    }\n}\n`;
    } else if (lang === "C++") {
      return `//{ Driver Code Starts\n// Initial Template for C++\n#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> ${funcName}(vector<int>& nums, int target) {\n        // Complete the function\n        return {};\n    }\n};\n`;
    } else if (lang === "SQL") {
      return `-- User SQL Query for ${title}\nSELECT * FROM table_name\nWHERE status = 'ACTIVE';\n`;
    } else {
      return problem?.starterCode || `function ${funcName}() {\n  // Write your code solution here\n  return true;\n}`;
    }
  };

  // Language-Specific Error Message Formatter
  const getLanguageSpecificError = (lang, codeStr) => {
    if (lang === "Java") {
      return {
        errorTitle: "Java Compilation Error (javac 17.0.2)",
        details: `Solution.java:8: error: ';' expected\n        return new int[]{}\n                         ^\nSolution.java:10: error: cannot find symbol\n  symbol:   variable target\n  location: class Solution\n2 errors generated.`
      };
    } else if (lang === "Python") {
      return {
        errorTitle: "Python Syntax / Indentation Error (Python 3.10)",
        details: `Traceback (most recent call last):\n  File "Solution.py", line 4, in twoSum\n    if nums[i] + nums[j] == target\nSyntaxError: expected ':'\nIndentationError: unindent does not match any outer indentation level`
      };
    } else if (lang === "C++") {
      return {
        errorTitle: "C++ Compiler Error (g++ 11.2.0)",
        details: `solution.cpp:8:15: error: expected ';' at end of declaration list\n        return {}\n                 ^\n                 ;\nsolution.cpp:11:5: error: use of undeclared identifier 'target'\n2 errors generated.`
      };
    } else if (lang === "SQL") {
      return {
        errorTitle: "SQL Engine Syntax Error (MySQL 8.0)",
        details: `ERROR 1064 (42000) at line 2: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'WHERE status = ACTIVE' at line 2`
      };
    } else {
      // JavaScript (ES6)
      return {
        errorTitle: "JavaScript V8 Engine Syntax Error",
        details: `Uncaught SyntaxError: Unexpected token '}' at solution.js:6:14\nTypeError: Cannot read properties of undefined (reading 'length')\n    at twoSum (solution.js:5:14)\n    at Object.<anonymous> (solution.js:12:1)`
      };
    }
  };

  const openProblemSolver = (problem) => {
    setActiveProblem(problem);
    setActiveModalTab("description");
    const code = getLanguageTemplate(problem, selectedLang);
    setUserCode(code);
    setTestOutput(null);
  };

  const handleLangSelect = (newLang) => {
    setSelectedLang(newLang);
    if (activeProblem) {
      setUserCode(getLanguageTemplate(activeProblem, newLang));
    }
  };

  const loadPastSubmission = (sub) => {
    setSelectedLang(sub.lang.split(" ")[0]);
    setUserCode(sub.code);
    showToast(`📜 Loaded ${sub.lang} submission from ${sub.timestamp} into editor!`);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTestOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      const codeStr = (userCode || "").trim();

      const hasError = codeStr.includes("error") || 
                       codeStr.includes("bug") || 
                       codeStr.includes("throw new Error") || 
                       (codeStr.match(/\(/g) || []).length !== (codeStr.match(/\)/g) || []).length ||
                       (codeStr.match(/\{/g) || []).length !== (codeStr.match(/\}/g) || []).length;

      if (hasError || codeStr.length < 15) {
        const errObj = getLanguageSpecificError(selectedLang, codeStr);
        setTestOutput({
          isError: true,
          status: "Compilation / Runtime Error",
          errorTitle: errObj.errorTitle,
          details: errObj.details,
          timeTaken: "0.00 sec",
          spaceUsed: "0 KB"
        });
      } else {
        setTestOutput({
          isError: false,
          status: "Correct Answer!",
          details: "Input: nums = [2,7,11,15], target = 9\nYour Output: [0, 1]\nExpected Output: [0, 1]\n\nTest Case 1: Passed ✓\nTest Case 2: Passed ✓\nTest Case 3: Passed ✓\nTest Case 4: Passed ✓\nTest Case 5: Passed ✓",
          timeTaken: "0.04 sec",
          spaceUsed: "15.2 MB",
          casesPassed: "50 / 50 Test Cases Passed"
        });
      }
    }, 800);
  };

  const handleSubmitSolution = () => {
    setIsExecuting(true);
    setTestOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      const codeStr = (userCode || "").trim();

      const hasError = codeStr.includes("error") || 
                       codeStr.includes("bug") || 
                       codeStr.includes("throw new Error") || 
                       (codeStr.match(/\(/g) || []).length !== (codeStr.match(/\)/g) || []).length ||
                       (codeStr.match(/\{/g) || []).length !== (codeStr.match(/\}/g) || []).length;

      const newSub = {
        id: `sub_${Date.now()}`,
        timestamp: "Just now",
        lang: selectedLang,
        status: hasError || codeStr.length < 15 ? "Compilation Error" : "Accepted",
        isPassed: !hasError && codeStr.length >= 15,
        runtime: hasError ? "0.00 sec" : "0.02 sec",
        memory: hasError ? "0 KB" : "14.8 MB",
        code: userCode
      };

      if (activeProblem) {
        setSubmissionsHistory(prev => ({
          ...prev,
          [activeProblem.id]: [newSub, ...(prev[activeProblem.id] || [])]
        }));
      }

      if (hasError || codeStr.length < 15) {
        const errObj = getLanguageSpecificError(selectedLang, codeStr);
        setTestOutput({
          isError: true,
          status: "Compilation / Runtime Error",
          errorTitle: errObj.errorTitle,
          details: errObj.details,
          timeTaken: "0.00 sec",
          spaceUsed: "0 KB"
        });
      } else {
        setTestOutput({
          isError: false,
          status: "Correct Answer!",
          details: "Input: nums = [2,7,11,15], target = 9\nYour Output: [0, 1]\nExpected Output: [0, 1]\n\nAll 50/50 Hidden Test Cases Passed ✓",
          timeTaken: "0.02 sec",
          spaceUsed: "14.8 MB",
          casesPassed: "50 / 50 Test Cases Passed"
        });

        if (activeProblem && !solvedProblemIds.includes(activeProblem.id)) {
          setSolvedProblemIds(prev => [...prev, activeProblem.id]);
          const xpNum = parseInt(activeProblem.xpVal.replace(/[^0-9]/g, '')) || 20;
          if (earnXp) earnXp(xpNum);
          showToast(`🎉 Problem "${activeProblem.title}" Solved! ${activeProblem.xpVal} Awarded!`);
        } else {
          showToast(`✨ Solution Submitted & Passed!`);
        }
      }
    }, 1000);
  };

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    if (bookmarkedProblemIds.includes(id)) {
      setBookmarkedProblemIds(prev => prev.filter(bId => bId !== id));
      showToast("Removed from bookmarks");
    } else {
      setBookmarkedProblemIds(prev => [...prev, id]);
      showToast("Saved to bookmarks ⭐");
    }
  };

  return (
    <div className={`caWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      <div className="caMainContainer">
        
        {/* ── LEFT SIDEBAR (MATCHING STUDENT DASHBOARD EXACTLY) ── */}
        <aside className="sdLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>

            {/* Connected Arch Line & Orange Circular Home Button Header */}
            <div className="sdSidebarHomeArchHeader">
              <div className="sdArchLine" />
              <button
                className="sdHomeCircularBtn"
                onClick={() => navigate("/student-home")}
                title="Dashboard Overview"
              >
                <FaHome />
              </button>
            </div>

            {/* Sidebar Navigation Items */}
            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${item.id === "code-arena" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "assignments") navigate("/assignments");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "ai-buddy") navigate("/ai-buddy");
                      else if (item.id === "opportunity-feed") navigate("/opportunity-feed");
                      else if (item.id === "daily-quests") navigate("/daily-quests");
                      else if (item.id === "badges") navigate("/badges");
                      else if (item.id === "certificates") navigate("/certificate");
                      else if (item.id === "progress") navigate("/progress");
                      else if (item.id === "resume") navigate("/resume");
                      else if (item.id === "settings") navigate("/settings");
                      else if (item.id === "code-arena") navigate("/code-arena");
                    }}
                  >
                    <span className="navIcon">{item.icon}</span>
                    <span className="navLabel">{item.label}</span>
                    {item.isNew && <span className="navNewBadge">New</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Sidebar Container: Rocket Graphic + Theme Controls */}
          <div className="sdSidebarBottomSection">
            <div className="sdRocketIllustrationBox">
              <span className="sdRocketEmoji">🚀</span>
              <div className="sdCloudDeco"></div>
            </div>

            <div className="sdSidebarFooterControls">
              <button className="sdThemeToggleBtn" onClick={toggleTheme} title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN CONTENT AREA ── */}
        <main className="caRightBodyArea">
          
          {/* Header Bar */}
          <header className="caHeaderBar">
            <div className="caHeaderLeftTitle">
              <div className="codeLogoIcon">&lt;/&gt;</div>
              <div>
                <h2>CodeArena</h2>
                <p>Master coding interviews like a pro</p>
              </div>
            </div>

            <div className="caHeaderSearchBox">
              <FaSearch className="searchIcon" />
              <input
                type="text"
                placeholder="Search problems, topics or companies... (Ctrl /)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="caHeaderRightStats">
              <div className="caStreakBadge">
                <FaFire color="#F9572A" /> <span>0 Day Streak</span>
              </div>
              <div className="caXpBadge">
                <FaStar color="#F59E0B" /> <span>{userXp.toLocaleString()} XP</span>
              </div>
              <div className="caNotifBtn" onClick={() => showToast("🔔 3 New Coding Challenges Available!")}>
                <FaBell />
                <span className="notifDot">3</span>
              </div>
              <div className="caUserProfilePill">
                <div className="avatarCircle">👩‍🎓</div>
                <div className="userText">
                  <strong>{userName}</strong>
                  <span>Level {userLevel}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main 2-Column Grid */}
          <div className="caDashboardGrid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
            
            {/* ── LEFT MAIN COLUMN ── */}
            <div className="caCenterCol">
              
              {/* CodeArena Hero Banner */}
              <div className="caHeroBanner">
                <div className="heroTextContent">
                  <h1>CodeArena</h1>
                  <h2>Practice. Compete. Get Hired.</h2>
                  <p>Solve coding challenges from top companies.</p>

                  <div className="heroStatsRow">
                    <span className="heroChip">📦 15,000+ Problems</span>
                    <span className="heroChip">👥 Trusted by 50K+ Students</span>
                  </div>
                </div>

                {/* Floating Brand Logos */}
                <div className="floatingLogosCluster">
                  <div className="logoBubble google">G</div>
                  <div className="logoBubble amazon">a</div>
                  <div className="logoBubble msft">❖</div>
                  <div className="logoBubble adobe">A</div>
                  <div className="logoBubble netflix">N</div>
                </div>

                <div className="heroIllustration">
                  <img src={studentHeroImg} alt="Developer Coding Illustration" />
                </div>
              </div>

              {/* 4 Mini Stat Sparkline Cards */}
              <div className="caStatCardsRow">
                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox green"><FaCheckCircle /></span>
                    <span className="label">Problems Solved</span>
                  </div>
                  <div className="statVal">0</div>
                  <div className="statSub green">↑ 0 this week</div>
                  <div className="sparklineSvg green">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 15 Q 25 5, 50 12 T 100 2" fill="none" stroke="#10B981" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox orange"><FaFire /></span>
                    <span className="label">Current Streak</span>
                  </div>
                  <div className="statVal">0 Days</div>
                  <div className="statSub orange">Best: 0 days</div>
                  <div className="sparklineSvg orange">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 18 Q 30 10, 60 14 T 100 4" fill="none" stroke="#F9572A" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox purple"><FaBullseye /></span>
                    <span className="label">Interview Readiness</span>
                  </div>
                  <div className="statVal">0%</div>
                  <div className="statSub purple">↑ 0% this week</div>
                  <div className="sparklineSvg purple">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 16 Q 20 8, 70 12 T 100 3" fill="none" stroke="#8B5CF6" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox yellow"><FaStar /></span>
                    <span className="label">XP Earned</span>
                  </div>
                  <div className="statVal">{userXp.toLocaleString()} XP</div>
                  <div className="statSub yellow">↑ 0 this week</div>
                  <div className="sparklineSvg yellow">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 14 Q 40 18, 70 6 T 100 1" fill="none" stroke="#F59E0B" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Company Based Practice Grid */}
              <div className="caSectionContainer">
                <div className="caSectionHeader">
                  <h3>Company Based Practice</h3>
                  <span className="linkText" onClick={() => setSelectedCompanyFilter("All")}>View All &gt;</span>
                </div>

                <div className="companiesCardsGrid">
                  {companies.map(comp => (
                    <div
                      key={comp.id}
                      className={`companyMiniCard ${selectedCompanyFilter === comp.id ? "selected" : ""}`}
                      onClick={() => {
                        if (selectedCompanyFilter === comp.id) setSelectedCompanyFilter("All");
                        else setSelectedCompanyFilter(comp.id);
                      }}
                    >
                      <div className="compLogoBox">
                        {comp.name === "Google" ? "🔴🟡🟢" : comp.name === "Amazon" ? "📦" : comp.name === "Microsoft" ? "❖" : comp.name === "Adobe" ? "🔺" : comp.name === "Goldman Sachs" ? "🏛️" : comp.name === "Walmart" ? "✳️" : "🔷"}
                      </div>
                      <div className="compText">
                        <strong>{comp.name}</strong>
                        <span>{comp.questions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Topics Grid */}
              <div className="caSectionContainer">
                <div className="caSectionHeader">
                  <h3>Popular Topics</h3>
                  <span className="linkText" onClick={() => setSelectedTopicFilter("All")}>Explore All Topics &gt;</span>
                </div>

                <div className="topicsGrid2x5">
                  {topics.map(top => (
                    <div
                      key={top.id}
                      className={`topicCard ${selectedTopicFilter === top.id ? "selected" : ""}`}
                      onClick={() => {
                        if (selectedTopicFilter === top.id) setSelectedTopicFilter("All");
                        else setSelectedTopicFilter(top.id);
                      }}
                    >
                      <div className="topicTopRow">
                        <div className="topicIconBox" style={{ color: top.color }}>{top.icon}</div>
                        <div className="topicTitleBlock">
                          <h4>{top.title}</h4>
                          <span>{top.questions}</span>
                        </div>
                      </div>
                      <div className="topicProgressTrack">
                        <div className="topicProgressFill" style={{ width: `${top.pct}%`, background: top.color }}></div>
                      </div>
                      <div className="topicBottomRow">
                        <span className="pctLabel">{top.pct}%</span>
                        <span className="xpBadgeLabel" style={{ color: top.color }}>{top.xpVal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Problems Table & Filters */}
              <div className="caSectionContainer">
                <div className="caSectionHeader">
                  <h3>All Problems</h3>
                </div>

                {/* Filter Controls Bar */}
                <div className="problemsFilterBar">
                  <div className="diffPillsRow">
                    {["All", "Easy", "Medium", "Hard"].map(diff => (
                      <button
                        key={diff}
                        className={`diffPill ${selectedDifficulty === diff ? "active " + diff.toLowerCase() : ""}`}
                        onClick={() => setSelectedDifficulty(diff)}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>

                  <div className="dropdownFiltersRow">
                    <select
                      value={selectedCompanyFilter}
                      onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                      className="filterSelect"
                    >
                      <option value="All">All Companies</option>
                      {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    <select
                      value={selectedTopicFilter}
                      onChange={(e) => setSelectedTopicFilter(e.target.value)}
                      className="filterSelect"
                    >
                      <option value="All">All Topics</option>
                      {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                    </select>

                    <button className="iconFilterBtn" onClick={() => showToast("⭐ Filtered by Bookmarks")}>
                      <FaBookmark />
                    </button>
                  </div>
                </div>

                {/* Problems Table */}
                <div className="problemsTableWrapper">
                  <table className="problemsTable">
                    <thead>
                      <tr>
                        <th style={{ width: "40px" }}>#</th>
                        <th>Problem</th>
                        <th>Company</th>
                        <th>Difficulty</th>
                        <th>XP</th>
                        <th>Acceptance</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProblems.map((prob) => {
                        const isSolved = solvedProblemIds.includes(prob.id);
                        const isBookmarked = bookmarkedProblemIds.includes(prob.id);

                        return (
                          <tr key={prob.id} className={isSolved ? "rowSolved" : ""}>
                            <td className="colNum">{prob.id}</td>
                            <td className="colTitle">
                              <div className="probTitleFlex">
                                <strong>{prob.title}</strong>
                                <span
                                  className={`starIcon ${isBookmarked ? "active" : ""}`}
                                  onClick={(e) => toggleBookmark(prob.id, e)}
                                >
                                  {isBookmarked ? "★" : "☆"}
                                </span>
                              </div>
                            </td>
                            <td className="colCompany">
                              <span className="companyChip">{prob.company}</span>
                            </td>
                            <td className="colDiff">
                              <span className={`diffTag ${prob.difficulty.toLowerCase()}`}>
                                {prob.difficulty}
                              </span>
                            </td>
                            <td className="colXp">
                              <span className="xpTag">{prob.xpVal}</span>
                            </td>
                            <td className="colAcc">
                              <div className="accFlex">
                                <span>{prob.acceptance}</span>
                                <div className="miniBarTrack">
                                  <div className="miniBarFill" style={{ width: prob.acceptance }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="colStatus" style={{ textAlign: "center" }}>
                              {isSolved ? (
                                <span className="solvedCheck">✓</span>
                              ) : (
                                <span className="unsolvedDot">○</span>
                              )}
                            </td>
                            <td className="colAction" style={{ textAlign: "right" }}>
                              <button
                                className="btnSolveAction"
                                onClick={() => openProblemSolver(prob)}
                              >
                                Solve →
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 10-Questions-Per-Page Pagination Controls Bar */}
                {filteredProblems.length > 0 && (
                  <div className="caPaginationBar">
                    <span className="caPaginationSummary">
                      Showing <strong>{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredProblems.length)}</strong> of <strong>{filteredProblems.length}</strong> Problems
                    </span>

                    <div className="caPaginationButtonsRow">
                      <button
                        className="caPageBtn"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        title="First Page"
                      >
                        ⏮ First
                      </button>
                      <button
                        className="caPageBtn"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        title="Previous Page"
                      >
                        ◀ Prev
                      </button>

                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(num => (
                        <button
                          key={num}
                          className={`caPageNumBtn ${currentPage === num ? "active" : ""}`}
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      ))}

                      <button
                        className="caPageBtn"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        title="Next Page"
                      >
                        Next ▶
                      </button>
                      <button
                        className="caPageBtn"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        title="Last Page"
                      >
                        Last ⏭
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* ── RIGHT SIDEBAR WIDGETS COLUMN ── */}
            <div className="caRightCol" style={{ display: "none" }}>
              
              {/* 1. Weekly Contest Card */}
              <div className="caWidgetCard contestCard">
                <div className="widgetHeaderRow">
                  <span className="trophyHeaderIcon"><FaTrophy color="#F59E0B" /></span>
                  <h4>Weekly Contest</h4>
                </div>

                <div className="contestTitleBox">
                  <h5>CodeSprint 113</h5>
                  <p>📅 Sat, 25 May 2025</p>
                  <p>🕒 08:00 PM - 10:00 PM IST</p>
                </div>

                <button
                  className={`btnRegisterContest ${isContestRegistered ? "registered" : ""}`}
                  onClick={() => {
                    setIsContestRegistered(true);
                    showToast("🎉 Registered for CodeSprint 113 Contest!");
                  }}
                >
                  {isContestRegistered ? "✓ Registered" : "Register Now"}
                </button>

                <div className="seeHistoryLink" onClick={() => showToast("📜 Contest History Loaded!")}>
                  See Contest History &gt;
                </div>
              </div>

              {/* 2. Coding Streak Calendar Card */}
              <div className="caWidgetCard">
                <div className="widgetHeaderRow">
                  <span className="fireHeaderIcon"><FaFire color="#F9572A" /></span>
                  <h4>Coding Streak</h4>
                  <span className="monthTag">May 2025 &gt;</span>
                </div>

                <div className="streakCalendarGrid">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, dIdx) => (
                    <span key={dIdx} className="dayHead">{day}</span>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const dayNum = i + 1;
                    const isStreakDay = false;
                    return (
                      <div
                        key={dayNum}
                        className={`calDayNum ${isStreakDay ? "streakActive" : ""}`}
                      >
                        {dayNum}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Your Rank Widget Card */}
              <div className="caWidgetCard">
                <div className="widgetHeaderRow">
                  <h4>Your Rank</h4>
                  <span className="viewRankLink" onClick={() => navigate("/progress")}>View Leaderboard &gt;</span>
                </div>

                <div className="rankList">
                  <div className="rankRowItem">
                    <div className="rankLeft">
                      <span className="rankIcon">🌐</span>
                      <span>Global Rank</span>
                    </div>
                    <strong className="rankVal">Unranked</strong>
                  </div>

                  <div className="rankRowItem">
                    <div className="rankLeft">
                      <span className="rankIcon">🏛️</span>
                      <span>College Rank</span>
                    </div>
                    <strong className="rankVal">#18</strong>
                  </div>

                  <div className="rankRowItem">
                    <div className="rankLeft">
                      <span className="rankIcon">👥</span>
                      <span>Friends Rank</span>
                    </div>
                    <strong className="rankVal">#2</strong>
                  </div>
                </div>
              </div>

              {/* 4. Today's Challenge Widget */}
              <div className="caWidgetCard challengeCard">
                <div className="widgetHeaderRow">
                  <span className="targetIcon"><FaBullseye color="#F9572A" /></span>
                  <h4>Today's Challenge</h4>
                </div>

                <div className="challengeBodyBox">
                  <h5>Longest Consecutive Sequence</h5>
                  <div className="challengeTags">
                    <span className="diffTag medium">Medium</span>
                    <span className="xpBadge">+75 XP</span>
                  </div>
                  <div className="targetCircleGraphic">🎯</div>
                </div>

                <button
                  className="btnSolveChallenge"
                  onClick={() => openProblemSolver({
                    id: 99,
                    title: "Longest Consecutive Sequence",
                    company: "Amazon",
                    difficulty: "Medium",
                    xpVal: "+75 XP",
                    acceptance: "48.2%",
                    desc: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
                    starterCode: `function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let max = 0;\n  for (let num of set) {\n    if (!set.has(num - 1)) {\n      let curr = num;\n      let count = 1;\n      while (set.has(curr + 1)) {\n        curr++;\n        count++;\n      }\n      max = Math.max(max, count);\n    }\n  }\n  return max;\n}`
                  })}
                >
                  Solve Challenge →
                </button>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* ── FLOATING TOAST NOTIFICATION ── */}
      {toastMsg && (
        <div className="caToastBanner">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ── INTERACTIVE GFG-STYLE PROBLEM SOLVER IDE MODAL ── */}
      {activeProblem && (
        <div className="caModalOverlay" onClick={() => setActiveProblem(null)}>
          <div className="caModalIdeContent" onClick={(e) => e.stopPropagation()}>
            
            {/* GFG Modal Top Bar Header */}
            <div className="ideModalHeader">
              <div className="ideTitleRow">
                <span className="codeIcon">&lt;/&gt;</span>
                <h3>{activeProblem.title}</h3>
                <span className={`diffTag ${activeProblem.difficulty.toLowerCase()}`}>{activeProblem.difficulty}</span>
                <span className="xpTag">{activeProblem.xpVal}</span>
                <span className="accTag">Accuracy: {activeProblem.acceptance}</span>
              </div>
              <button className="modalCloseBtn" onClick={() => setActiveProblem(null)}>✕</button>
            </div>

            {/* Modal IDE 2-Column Grid */}
            <div className="ideGridContainer">
              
              {/* LEFT COLUMN: GFG PROBLEM STATEMENT & SUBMISSIONS TABS */}
              <div className="ideStatementCol">
                
                {/* Left Pane Sub-Header Tabs */}
                <div className="modalLeftTabsRow">
                  <button
                    className={`modalTabBtn ${activeModalTab === "description" ? "active" : ""}`}
                    onClick={() => setActiveModalTab("description")}
                  >
                    📖 Problem Statement
                  </button>
                  <button
                    className={`modalTabBtn ${activeModalTab === "submissions" ? "active" : ""}`}
                    onClick={() => setActiveModalTab("submissions")}
                  >
                    📜 My Submissions ({(submissionsHistory[activeProblem.id] || []).length})
                  </button>
                </div>

                {activeModalTab === "description" ? (
                  <>
                    <h4 style={{ marginTop: "12px" }}>Problem Description</h4>
                    <p className="probDescText">{activeProblem.desc}</p>

                    <div className="gfgComplexityBox">
                      <div><strong>Expected Time Complexity:</strong> <code>O(N)</code></div>
                      <div><strong>Expected Auxiliary Space:</strong> <code>O(1)</code></div>
                    </div>

                    <div className="exampleBox">
                      <strong>Example 1:</strong>
                      <pre>Input: nums = [2,7,11,15], target = 9{"\n"}Output: [0, 1]{"\n"}Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</pre>
                    </div>

                    <div className="exampleBox">
                      <strong>Example 2:</strong>
                      <pre>Input: nums = [3,2,4], target = 6{"\n"}Output: [1, 2]{"\n"}Explanation: nums[1] + nums[2] == 6, we return [1, 2].</pre>
                    </div>

                    <div className="constraintsBox">
                      <strong>Constraints:</strong>
                      <ul>
                        <li>1 &lt;= nums.length &lt;= 10^5</li>
                        <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                        <li>-10^9 &lt;= target &lt;= 10^9</li>
                        <li>Only one valid answer exists.</li>
                      </ul>
                    </div>

                    <div className="gfgTagsRow">
                      <span className="tagLbl">Company Tags:</span>
                      <span className="gfgTagChip">{activeProblem.company}</span>
                      <span className="gfgTagChip">Amazon</span>
                      <span className="gfgTagChip">Google</span>
                    </div>

                    <div className="gfgTagsRow" style={{ marginTop: "8px" }}>
                      <span className="tagLbl">Topic Tags:</span>
                      <span className="gfgTagChip">{activeProblem.topic}</span>
                      <span className="gfgTagChip">Data Structures</span>
                    </div>
                  </>
                ) : (
                  /* SUBMISSIONS HISTORY LIST VIEW */
                  <div className="submissionsHistoryContainer">
                    <h4 style={{ marginTop: "12px" }}>Previous Submissions</h4>
                    <p className="subHeadingText">Click any submission to preview or load its code into the editor.</p>

                    {(!submissionsHistory[activeProblem.id] || submissionsHistory[activeProblem.id].length === 0) ? (
                      <div className="emptySubmissionsBox">
                        <span>📭 No previous submissions found for this problem yet. Submit a solution to save code!</span>
                      </div>
                    ) : (
                      <div className="submissionsList">
                        {submissionsHistory[activeProblem.id].map((sub, idx) => (
                          <div key={sub.id || idx} className={`submissionCard ${sub.isPassed ? "passed" : "failed"}`}>
                            <div className="subCardHeader">
                              <span className={`subStatusBadge ${sub.isPassed ? "pass" : "fail"}`}>
                                {sub.isPassed ? "Accepted ✓" : "Compilation Error ✕"}
                              </span>
                              <span className="subLangTag">{sub.lang}</span>
                              <span className="subTimeTag">{sub.timestamp}</span>
                            </div>

                            <div className="subMetricsRow">
                              <span>Time: {sub.runtime}</span>
                              <span>•</span>
                              <span>Memory: {sub.memory}</span>
                            </div>

                            {/* Code Preview Box */}
                            <pre className="subCodePreview">{sub.code}</pre>

                            <button
                              className="btnLoadCode"
                              onClick={() => loadPastSubmission(sub)}
                            >
                              📥 Load Code into Editor
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: CODE EDITOR & COMPILER CONSOLE */}
              <div className="ideEditorCol">
                
                {/* Editor Header Control Bar */}
                <div className="editorHeader">
                  <div className="langSelectFlex">
                    <span className="langLbl">Language:</span>
                    <select
                      value={selectedLang}
                      onChange={(e) => handleLangSelect(e.target.value)}
                      className="langSelect"
                    >
                      <option value="JavaScript">JavaScript (ES6)</option>
                      <option value="Python">Python 3.10</option>
                      <option value="Java">Java 17</option>
                      <option value="C++">C++ 20</option>
                      <option value="SQL">SQL (ANSI)</option>
                    </select>
                  </div>

                  <div className="ideActionsRow">
                    <button
                      className="btnResetCode"
                      onClick={() => setUserCode(getLanguageTemplate(activeProblem, selectedLang))}
                      title="Reset Code Template"
                    >
                      🔄 Reset
                    </button>
                    <button className="btnRunTests" onClick={handleRunCode} disabled={isExecuting}>
                      {isExecuting ? "Compiling..." : "▶ Compile & Run"}
                    </button>
                    <button className="btnSubmitSolution" onClick={handleSubmitSolution} disabled={isExecuting}>
                      {isExecuting ? "Submitting..." : "🚀 Submit"}
                    </button>
                  </div>
                </div>

                {/* Code Textarea with Line Numbers Counter */}
                <div className="codeEditorWrapper">
                  <div className="lineNumbersCol">
                    {Array.from({ length: Math.max(12, (userCode || "").split("\n").length) }, (_, i) => i + 1).map(n => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                  <textarea
                    className="codeEditorTextarea"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder={`Write your ${selectedLang} code solution here...`}
                  />
                </div>

                {/* GFG-Style Testcase Compilation / Execution Output Console */}
                {testOutput && (
                  <div className={`gfgConsolePanel ${testOutput.isError ? "errorMode" : "successMode"}`}>
                    <div className="gfgConsoleHeader">
                      <div className="statusBadge">
                        {testOutput.isError ? (
                          <span className="errBadge">❌ {testOutput.status}</span>
                        ) : (
                          <span className="successBadge">✅ {testOutput.status}</span>
                        )}
                      </div>
                      <div className="consoleMetrics">
                        <span>⏱ Time Taken: <strong>{testOutput.timeTaken}</strong></span>
                        <span>💾 Auxiliary Space: <strong>{testOutput.spaceUsed}</strong></span>
                        {testOutput.casesPassed && <span className="casesPassedPill">{testOutput.casesPassed}</span>}
                      </div>
                    </div>

                    {testOutput.isError ? (
                      <div className="gfgErrorBox">
                        <strong className="errTitle">{testOutput.errorTitle}</strong>
                        <pre className="errCodeDetails">{testOutput.details}</pre>
                      </div>
                    ) : (
                      <div className="gfgSuccessBox">
                        <pre className="outputLogs">{testOutput.details}</pre>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      <StudentFooter />
    </div>
  );
}
