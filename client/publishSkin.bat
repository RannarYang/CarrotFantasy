@echo off

set curDir=%~dp0
set pyexe=%curDir%..\..\data\client\tool\Python27\python.exe
set pyscript=%curDir%create_thm.py

echo ��������Ƥ��
%pyexe% %pyscript%
echo �������

