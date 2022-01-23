import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs'
import { resolve, extname } from 'path'
import { createInterface } from 'readline'

@Injectable()
export class AppService {
  async getHello(): Promise<Record<string, any>> {

    const { name, content, extname } = await this.processLineByLine()

    return {
      data: { name, content, extname },
      code: 200,
      success: true
    };
  }

  async processLineByLine() {

    const fileName = 'node-http.ts'
    const filePath = resolve(__dirname, './static/', fileName)

    const fileStream = createReadStream(filePath);
    const itemExtname = extname(filePath).slice(1)

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let lineCount = 1
    let itemName = ''
    let itemContent = ''
    for await (const line of rl) {

      if (lineCount === 1) {
        itemName = line.slice(3)
      } else {
        itemContent = itemContent + line + '\r\n'
      }
      lineCount++
    }

    return {
      name: itemName,
      content: itemContent,
      extname: itemExtname
    }
  }
}
