import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NumberService {
  constructor(private httpService: HttpService) {}

  private isPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2, sqrt = Math.sqrt(num); i < sqrt; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  private isPerfect(num: number): boolean {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
      if (num % i === 0) {
        sum += i + num / i;
      }
    }
    return sum === num;
  }

  private isArmstrong(num: number): boolean {
    const strNumber = num.toString();
    const digitCount = strNumber.length;
    let sum = 0;
    for (let i = 0; i < digitCount; i++) {
      sum += Math.pow(parseInt(strNumber[i]), digitCount);
    }
    return sum === num;
  }

  private calculateDigitSum(num: number): number {
    const numStr = num.toString();
    let sum = 0;

    if (numStr[0] === '-') {
      sum -= parseInt(numStr[1], 10);
      for (let i = 2; i < numStr.length; i++) {
        sum += parseInt(numStr[i], 10);
      }
    } else {
      for (let i = 0; i < numStr.length; i++) {
        sum += parseInt(numStr[i], 10);
      }
    }

    return sum;
  }

  private async getFunFact(num: number): Promise<string> {
    const url = `http://numbersapi.com/${num}/math`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      return `No fun fact available for ${num}`;
    }
  }

  async classifyNumber(number: string) {
    // Input validation
    if (!/^-?\d+$/.test(number)) {
      throw new BadRequestException({
        number: number,
        error: true,
      });
    }

    const parsedNumber = parseInt(number, 10);

    // Mathematical properties
    const isPrime = this.isPrime(parsedNumber);
    const isPerfect = this.isPerfect(parsedNumber);
    const isArmstrong = this.isArmstrong(parsedNumber);
    const isOdd = parsedNumber % 2 !== 0;
    const digitSum = this.calculateDigitSum(parsedNumber);

    // Fetch fun fact
    const funFact = await this.getFunFact(parsedNumber);

    // Determine properties array
    const properties = [];
    if (isArmstrong) {
      properties.push('armstrong');
    }
    properties.push(isOdd ? 'odd' : 'even');

    return {
      number: parsedNumber,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties: properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    };
  }
}
